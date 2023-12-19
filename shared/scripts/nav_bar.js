const navBar = document.getElementById("nav-bar");

let navIsOpen = true;

window.addEventListener("mousemove", (event) => {
  if ( !navIsOpen && event.clientX < window.innerWidth * 0.1 ) {
    navBar.style.opacity = 1;
    navBar.style.width = "25vw";
    navIsOpen = true;
  } else if ( navIsOpen && event.clientX > window.innerWidth * 0.2 ) {
    navBar.style.opacity = 0;
    navBar.style.width = "0px";
    navIsOpen = false;
  }
});
