var globalLanguage = "en";

function switchLanguage(language) {
    let allStrings = document.querySelectorAll('[localized]');

    for (let i = 0; i < allStrings.length; i++) {
        let string = allStrings[i];

        if (isInChosenLanguage(string, language)) {
            isHidden(string) && unhide(string);
        } else {
            !isHidden(string) && hide(string);
        }
    }
    globalLanguage = globalLanguage === "en" ? "ru" : "en";
}


function isHidden(element) {
    return element.classList.contains('hidden');
}

function isInChosenLanguage(element, language) {
    return element.hasAttribute(language);
}

function hide(element) {
    element.classList.add('hidden');
}

function unhide(element) {
    element.classList.remove('hidden');
}