window.onload = init;

function init() {
  userSpeaksRussian() ? switchLanguage("ru") : switchLanguage("en");
}

function userSpeaksRussian() {
    if (navigator.languages && navigator.languages.length) {
      for (let i = 0; i < navigator.languages.length; i++) {
        if (navigator.languages[i] === "ru") {
          return true;
        }
      }
    } else {
      if (navigator.userLanguage === "ru" || navigator.language === "ru" || navigator.browserLanguage === "ru"){
        return true;
      }
    }
    return false;
}