const divCams = document.getElementById("div-cams");
const footer = document.getElementById("footer");

function updateFooter() {
    footer.style.width = (divCams.scrollTop / (divCams.scrollHeight - divCams.clientHeight)) * 100 + "%";
}

divCams.addEventListener("scroll", updateFooter);
