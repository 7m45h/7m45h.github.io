async function setPlaceHolder() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: { height: 320, width: 240 }, audio: false });
    document.querySelectorAll("#div-cams > video").forEach((video) => {
        video.srcObject = stream;
    });
}

setPlaceHolder();
