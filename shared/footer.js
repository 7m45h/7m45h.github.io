const footer = document.getElementById("footer");
const mainDiv = document.getElementById("div-main");

function updateScrollBar() {
    footer.style.width = (mainDiv.scrollTop / (mainDiv.scrollHeight - mainDiv.clientHeight)) * 100 + "%";
}

updateScrollBar();

mainDiv.addEventListener("scroll", updateScrollBar);
