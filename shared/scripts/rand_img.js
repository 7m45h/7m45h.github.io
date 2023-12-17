const randIMGS = document.querySelectorAll(".rand-img");

async function setRandIMG(randIMG) {
  let randID = Math.random();
  let imgInfo;

  imgInfo = await fetch(`https://picsum.photos/seed/${randID}//info`);
  imgInfo = await imgInfo.json();

  randIMG.innerHTML = `
    <img src="https://picsum.photos/seed/${randID}/1280/720/" title="random image from awsome site picsum.photos">
    <figcaption>
      <a class="anc-ext" href="https://github.com/DMarby/picsum-photos" target="_blank">picsum.photos</a>
      <a class="anc-ext" href="${imgInfo.url}" target="_blank">${imgInfo.author}</a>
    </figcaption>
  `
}

randIMGS.forEach(setRandIMG);
