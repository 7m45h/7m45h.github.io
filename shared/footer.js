const scrollBar = document.getElementById("div-scroll");
const mainDiv = document.getElementById("main-div");

function updateScrollBar() {
    let scroll = (mainDiv.scrollTop / (mainDiv.scrollHeight - mainDiv.clientHeight)) * 100;
    scrollBar.style.width = scroll + "%";
}

updateScrollBar();

mainDiv.addEventListener("scroll", updateScrollBar);
