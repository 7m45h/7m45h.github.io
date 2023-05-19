const scrollElm = document.getElementById("div-cams");
const footer = document.getElementById("footer");

function updateFooter() {
    footer.style.width = (scrollElm.scrollTop / (scrollElm.scrollHeight - scrollElm.clientHeight)) * 100 + "%";
}

scrollElm.addEventListener("scroll", updateFooter);
