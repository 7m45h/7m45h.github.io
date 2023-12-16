const navBar = document.getElementById("nav-bar");

let navIsOpen = false;

window.addEventListener("mousemove", (event) => {
  if ( !navIsOpen && event.clientX < window.innerWidth * 0.2 ) {
    navBar.style.opacity = 1;
    navBar.style.width = "20vw";
    navIsOpen = true;
  } else if ( navIsOpen && event.clientX > window.innerWidth * 0.3 ) {
    navBar.style.opacity = 0;
    navBar.style.width = "0px";
    navIsOpen = false;
  }
});
