const navBar = document.querySelector("nav");
const navBtn = document.getElementById("btn-nav");

let navIsOpen = true;

window.addEventListener("mousemove", (event) => {
  if ( !navIsOpen && event.clientX < window.innerWidth * 0.05 ) {
    navBar.style.width = "20vw";
    navBar.style.opacity = '1';
    navBtn.innerHTML = "&#60;";
    navIsOpen = true;
  } else if ( navIsOpen && event.clientX > window.innerWidth * 0.2 ) {
    navBar.style.opacity = '0';
    navBar.style.width = "0px";
    navBtn.innerHTML = "&#62;";
    navIsOpen = false;
  }
});
