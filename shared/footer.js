const scrollBar = document.getElementById("div-scroll");

function updateScrollBar() {
    let scroll = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
    scrollBar.style.width = scroll + "%";
}

updateScrollBar();

window.addEventListener("scroll", updateScrollBar);