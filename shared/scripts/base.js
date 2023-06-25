// UI

const _navBar = document.getElementById("nav-main");

// toggle nav element in pages when mouse touchs the left edge
window.addEventListener('mousemove', (evt) => {
    if (evt.clientX == 0) {
        _navBar.style.width = '20%';
        _navBar.style.opacity = '1';
    } else if (evt.clientX > window.innerWidth * 0.2) {
        _navBar.style.opacity = '0';
        _navBar.style.width = '0px';
    }
});
