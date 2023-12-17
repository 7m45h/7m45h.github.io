const navBar = document.getElementById("nav-bar");
const mainEL = document.querySelector("main");

let navIsOpen = false;

window.addEventListener("mousemove", (event) => {
  if ( !navIsOpen && event.clientX < window.innerWidth * 0.2 ) {
    navBar.style.opacity = 1;
    navBar.style.width = "20vw";
    mainEL.style.width = "50%";
    navIsOpen = true;
  } else if ( navIsOpen && event.clientX > window.innerWidth * 0.3 ) {
    navBar.style.opacity = 0;
    navBar.style.width = "0px";
    mainEL.style.width = "75%";
    navIsOpen = false;
  }
});
