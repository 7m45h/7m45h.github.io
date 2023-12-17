const rPanel = document.getElementById("r-panel");

let rPanelIsOpen = false;

window.addEventListener("mousemove", (event) => {
  if ( !rPanelIsOpen && event.clientX > window.innerWidth * 0.9 ) {
    rPanel.style.opacity = 1;
    rPanel.style.width = "25vw";
    rPanelIsOpen = true;
  } else if ( rPanelIsOpen && event.clientX < window.innerWidth * 0.8 ) {
    rPanel.style.opacity = 0;
    rPanel.style.width = "0px";
    rPanelIsOpen = false;
  }
});
