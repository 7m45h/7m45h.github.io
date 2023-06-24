// UI

const _navBar = document.getElementById("nav-main");

window.addEventListener('mousemove', (evt) => {
    if (evt.clientX == 0) {
        _navBar.style.width = '20%';
        _navBar.style.opacity = '1';
    } else if (evt.clientX > window.innerWidth * 20 / 100) {
        _navBar.style.opacity = '0';
        _navBar.style.width = '0px';
    }
});
