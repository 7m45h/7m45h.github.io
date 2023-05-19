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

async function createOffer() {
    connection.addEventListener("icecandidate", (evn) => {
        if (evn.candidate) {
            offerText.value = JSON.stringify(connection.localDescription);
        }
    });

    offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
}

async function createAnswer() {
    offer = JSON.parse(offerText.value);

    connection.addEventListener("icecandidate", (evn) => {
        if (evn.candidate) {
            answerText.value = JSON.stringify(connection.localDescription);
        }
    });

    await connection.setRemoteDescription(offer);
    answer = await connection.createAnswer();
    await connection.setLocalDescription(answer);
}

async function addAnswer() {
    answer = JSON.parse(answerText.value);
//    if (!connection.currentRemoteDescription) {
//        connection.setRemoteDescription(answer);
//    }

    connection.setRemoteDescription(answer);
}

init();
