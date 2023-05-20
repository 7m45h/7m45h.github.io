const buttonOffer = document.getElementById("conn-offer");
const buttonAnswer = document.getElementById("conn-answer");
const offerText = document.getElementById("text-offer");
const answerText = document.getElementById("text-answer");
const divCams = document.getElementById("div-cams");

let connection = new RTCPeerConnection();
let incomingStream = new MediaStream();
let outgoingStream;
let dataChannel;
let offer;
let answer;

async function createOffer() {
    connection.addEventListener("icecandidate", (evn) => {
        if (evn.candidate) {
            offerText.value = btoa(JSON.stringify(connection.localDescription));
        }
    });

    offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
}

async function createAnswer() {
    offer = JSON.parse(atob(offerText.value));

    connection.addEventListener("icecandidate", (evn) => {
        if (evn.candidate) {
            answerText.value = btoa(JSON.stringify(connection.localDescription));
        }
    });

    await connection.setRemoteDescription(offer);
    answer = await connection.createAnswer();
    await connection.setLocalDescription(answer);
}

async function addAnswer() {
    answer = JSON.parse(atob(answerText.value));
    if (!connection.currentRemoteDescription) {
        connection.setRemoteDescription(answer);
    }
}

offerText.addEventListener("input", (evn) => {
    if (!offerText.value.length == 0) {
        buttonOffer.disabled = true;
        buttonAnswer.disabled = false;
        buttonAnswer.value = "createAnswer";
        buttonAnswer.innerText = "create answer";
    } else {
        buttonOffer.disabled = false;
        buttonAnswer.disabled = true;
    }
});

function buttonHandler(buttonValue) {
    if (buttonValue == "createOffer") {
        createOffer();
        buttonOffer.disabled = true;
        buttonAnswer.disabled = false;
        buttonAnswer.value = "addAnswer";
        buttonAnswer.innerText = "add answer";
    } else if (buttonValue == "createAnswer") {
        createAnswer();
        buttonAnswer.disabled = true;
        buttonOffer.disabled = false;
        offerText.value = "";
        answerText.value = "";
    } else if (buttonValue == "addAnswer") {
        addAnswer();
        answerText.value = "";
    }
}

async function init() {
    outgoingStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

    outgoingStream.getTracks().forEach((track) => {
        connection.addTrack(track, outgoingStream);
    });

    connection.addEventListener("track", (evn) => {
        evn.streams.forEach((stream, streamNo) => {
            let camId = `cam-${streamNo}`;
            divCams.innerHTML += `<video id="${camId}" autoplay></video>`;
            stream.getTracks().forEach((track) => {
                incomingStream.addTrack(track);
                document.getElementById(camId).srcObject = incomingStream;
            });
        });
    });
}

init();
