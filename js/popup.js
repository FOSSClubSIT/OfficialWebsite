(function(){
  gsap.registerPlugin(MotionPathPlugin);

  // --- CONFIGURATION ---
  const DURATION = 3;
  const CURVINESS = 1.25;
  const START_MARGIN = 18;
  const FAR_RIGHT_MARGIN = 36;
  const ROTATION_OFFSET_DEG = 90; // adjust if your rocket sprite points differently

  // --- ELEMENT SELECTORS ---
  const rocketWrapper = document.getElementById('rocketWrapper');
  const rocketInner = document.getElementById('rocketInner');
  
  // *** NEW: Selectors for your main popup ***
  const popupOverlay = document.getElementById("popup-overlay");
  const closeBtn = document.getElementById("close-popup");

  // --- ROCKET SETUP ---
  rocketInner.style.transform = `rotate(${ROTATION_OFFSET_DEG}deg)`;
  let tween = null;

  // --- ROCKET ANIMATION FUNCTIONS ---

  function getPathPoints(){
    const W = window.innerWidth;
    const H = window.innerHeight;
    const start = { x: START_MARGIN, y: START_MARGIN };
    const pt2 = { x: Math.round(W * 0.90), y: Math.round(H * 0.3) };
    const pt3 = { x: Math.round(W * 0.45), y: Math.round(H * 0.45) };
    return [ start, pt2, pt3 ];
  }

  function placeAtStart(){
    const p = getPathPoints()[0];
    gsap.set(rocketWrapper, { x: p.x, y: p.y, rotation: 0, opacity: 1 });
    // Make sure the main popup is hidden
    if (popupOverlay) {
      popupOverlay.classList.remove('active');
    }
  }

  function launch(){
    if (tween) tween.kill();
    const path = getPathPoints();
    gsap.set(rocketWrapper, { x: path[0].x, y: path[0].y, rotation: 0, opacity: 1 });

    tween = gsap.to(rocketWrapper, {
      duration: DURATION,
      ease: "power2.inOut",
      motionPath: {
        path: path,
        curviness: CURVINESS,
        autoRotate: true
      }
    });

    gsap.delayedCall(DURATION - 0.5, () => {
      if (tween && tween.isActive()) {
        tween.pause();
        createExplosion();
      }
    });
  }

  function createExplosion(){
    gsap.set(rocketWrapper, { opacity: 0 });
    const rect = rocketWrapper.getBoundingClientRect();
    const finalX = rect.left + rect.width / 2;
    const finalY = rect.top + rect.height / 2;

    const container = document.createElement('div');
    container.style.position = "absolute";
    container.style.left = finalX + "px";
    container.style.top = finalY + "px";
    container.style.transform = "translate(-50%,-50%)";
    document.body.appendChild(container);

    const blast = document.createElement('div');
    blast.style.position = "absolute";
    blast.style.left = "50%";
    blast.style.top = "50%";
    blast.style.width = "150px";
    blast.style.height = "150px";
    blast.style.transform = "translate(-50%,-50%)";
    blast.style.borderRadius = "50%";
    blast.style.background = "rgba(43, 231, 131, 0.4)";
    blast.style.pointerEvents = "none";
    container.appendChild(blast);

    gsap.fromTo(blast,
      { scale: 0.2, opacity: 1 },
      { scale: 4, opacity: 0, duration: 1.2, ease: "power2.out", onComplete: () => blast.remove() }
    );

    const particleCount = 700;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      container.appendChild(particle);
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        opacity: 0,
        scale: Math.random() * 0.5,
        duration: Math.random() * 0.6 + 0.4,
        ease: "power2.out",
        delay: Math.random() * 0.2,
        onComplete: () => particle.remove()
      });
    }

    // *** MODIFIED: This now calls the function to show your main popup ***
    setTimeout(showMainPopup, 100);
    setTimeout(() => { if (container.parentNode) container.remove(); }, 2000);
  }

  // --- POPUP LOGIC (Integrated from your file) ---

  // *** MODIFIED: This function now shows your main popup by adding the 'active' class ***
  function showMainPopup(){
    if (popupOverlay) {
      popupOverlay.classList.add('active');
    }
  }

  // Event listener to close the popup with the button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popupOverlay.classList.remove("active");
    });
  }

  // Event listener to close the popup by clicking outside
  if (popupOverlay) {
    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.classList.remove("active");
      }
    });
  }

  // --- EVENT LISTENERS & INITIALIZATION ---
  
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (tween) tween.kill();
    placeAtStart();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {}, 150);
  });

  placeAtStart();

setTimeout(launch, 50);

const messages = [
  "☢ Nuclear Threat Detected — Operation Zero Hour",
  "⚠ Warhead Launch Confirmed — Operation Zero Hour",
  "💥 Nuclear Detonation Protocol — Operation Zero Hour",
  "🚨 Warhead Impact Imminent — Operation Zero Hour"
];

function randomMessage() {
  const alertText = document.getElementById("alertText");
  alertText.textContent = messages[Math.floor(Math.random() * messages.length)];
}

randomMessage();

})();