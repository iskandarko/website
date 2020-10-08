getLocation();

function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCountry);
    } else {
    console.log("Geolocation is not supported by this browser.");
    }
}

function getCountry(position) {
    //Create query for the API.
    var latitude = "latitude=" + position.coords.latitude;
    var longitude = "&longitude=" + position.coords.longitude;
    var query = latitude + longitude + "&localityLanguage=en";

    const Http = new XMLHttpRequest();

    var bigdatacloud_api =
    "https://api.bigdatacloud.net/data/reverse-geocode-client?";

    bigdatacloud_api += query;

    Http.open("GET", bigdatacloud_api);
    Http.send();

    Http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        chooseLocalization(myObj.countryName);
    }
    };
}

function chooseLocalization(country){
    if (country === "Russia") {
        switchLanguage("ru");
    } 
}
