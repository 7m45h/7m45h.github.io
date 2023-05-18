async function setPlaceHolder() {
    placeHolder = await navigator.mediaDevices.getUserMedia({ video: { width: 256, height: 144 }, audio: false });
    document.getElementById("cam-1").srcObject = placeHolder;
    document.getElementById("cam-2").srcObject = placeHolder;
    document.getElementById("cam-3").srcObject = placeHolder;
    document.getElementById("cam-4").srcObject = placeHolder;
}

setPlaceHolder();
