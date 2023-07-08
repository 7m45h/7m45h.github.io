const _navBar = document.querySelector("nav");

window.addEventListener("mousemove", (event) => {
  if ( event.clientX == 0 ) {
    _navBar.style.width = "20vw";
    _navBar.style.opacity = '1';
  } else if ( event.clientX > window.innerWidth * 0.2 ) {
    _navBar.style.opacity = '0';
    _navBar.style.width = "0px";
  }
});
