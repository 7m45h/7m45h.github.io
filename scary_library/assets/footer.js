const main = document.getElementById("main");
const footer = document.getElementById("footer");

function updateFooter() {
    footer.style.width = (main.scrollTop / (main.scrollHeight - main.clientHeight)) * 100 + "%";
}

main.addEventListener("scroll", updateFooter);
