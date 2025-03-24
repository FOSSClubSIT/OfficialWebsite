const hamburger = document.querySelector('.hamburger');
  const navlinks = document.querySelector('.nav-links');
  let menuOpen = false;

  hamburger.addEventListener('click',()=>{
    if (menuOpen == false) {
      navlinks.style.display = "flex";
      menuOpen = true;

    } else if(menuOpen == true) {
      navlinks.style.display = "none";
      menuOpen = false;
    }

  });