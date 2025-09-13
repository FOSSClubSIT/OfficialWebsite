document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById("popup-overlay");
  const closeBtn = document.getElementById("close-popup");

  // Show popup after 3 seconds
  setTimeout(() => {
    popupOverlay.classList.add("active");
  }, 30); //return to 3000 after testing for 3 sec delay

  // Close popup when clicking the close button
  closeBtn.addEventListener("click", () => {
    popupOverlay.classList.remove("active");
  });

  // Optional: Close popup when clicking outside the box
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove("active");
    }
  });
});

