const navlinks = document.querySelector('.nav-links');
const Overlay = document.getElementById("overlay")
function opensidebar(){
  navlinks.classList.add("show")
  Overlay.style.display = "block"

}

function closesidebar(){
  navlinks.classList.remove("show")
  Overlay.style.display = "none"
}