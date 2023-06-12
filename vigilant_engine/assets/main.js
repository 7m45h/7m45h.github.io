let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercase = "abcdefghijklmnopqrstuvwxyz";
let digits = "0123456789";
let punctuations = "!\"#\$%&\\'\(\)\*\+,-\.\/:;<=>\?@\[\\\]\^_`{\|}~";
let space = " ";

let config_text;

function update_input_text(checkbox) {
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

    config_text = f"{ uppercase, lowercase, digits, punctuations, space}";
    generate_random_text(config_text);
}

function generate_random_text(config_text) {

}
