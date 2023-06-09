const _divAbout = document.getElementById("about");

async function setRandImg() {
  let randId = Math.random();
  let randImgInfo;

  randImgInfo = await fetch(`https://picsum.photos/seed/${randId}//info`);
  randImgInfo = await randImgInfo.json();

  _divAbout.innerHTML = `
    <div class="blog-img">
      <img src="https://picsum.photos/seed/${randId}/1920/1080" title="Random image from awsome site picsum.photos">
      <a class="anc-ext" href="https://github.com/DMarby/picsum-photos" target="_blank">&#169;picsum.photos  &#8599;</a>
		  <a class="anc-ext" href="${randImgInfo.url}" target="_blank">&#169;${randImgInfo.author}  &#8599;</a>
    </div>
  `
}

setRandImg();