// UI

const _divHome = document.querySelector("#div-home");
const _randImg = document.querySelector("#div-home img");

async function setRandImg() {
    let randId = Math.random();
    let randImgInfo;

    _randImg.src = `https://picsum.photos/seed/${randId}/1920/1080`;
    randImgInfo = await fetch(`https://picsum.photos/seed/${randId}//info`);
    randImgInfo = await randImgInfo.json();

    _divHome.innerHTML += `<a class="anc-ext" href="${randImgInfo.url}" target="_blank">&#169;${randImgInfo.author}  &#8599;</a>`
}

setRandImg();
