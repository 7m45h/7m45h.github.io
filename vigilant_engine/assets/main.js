const inputRange = document.getElementById("input-lenght");
const outputField = document.getElementById("output-pass");

let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercase = "abcdefghijklmnopqrstuvwxyz";
let digits = "0123456789";
let punctuations = "!\"#\$%&\\'\(\)\*\+,-\.\/:;<=>\?@\[\\\]\^_`{\|}~";
let space = " ";

let configText = [...`${uppercase}${lowercase}${digits}${punctuations}${space}`];
let configLen = inputRange.value;

function updateConfigText(checkbox) {
    switch (checkbox.id) {
        case "check-upper":
            uppercase = checkbox.checked ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
            break;
        case "check-lower":
            lowercase = checkbox.checked ? "abcdefghijklmnopqrstuvwxyz" : "";
            break;
        case "check-digits":
            digits = checkbox.checked ? "0123456789" : "";
            break;
        case "check-punct":
            punctuations = checkbox.checked ? "!\"#\$%&\\'\(\)\*\+,-\.\/:;<=>\?@\[\\\]\^_`{\|}~" : "";
            break;
        case "check-space":
            space = checkbox.checked ? " " : "";
            break;
    }

    configText = [...`${uppercase}${lowercase}${digits}${punctuations}${space}`];
    genOutput();
}

function genOutput() {
    let output = "";
    let configTextLen = configText.length;
    for (let iterator = 0; iterator <= configLen; iterator++) {
        output += configText[Math.floor(Math.random() * configTextLen)];
    }
    outputField.innerText = output;
}

genOutput();
