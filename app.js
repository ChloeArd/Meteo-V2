let url = "https://api.openweathermap.org/data/2.5/weather?q=anor&units=metric&lang=fr&appid=f5c382e18131ee20c243227653a7d50c";

// I make a GET request to the URL provided.
$.get(url, function (response) { // The response in parameter contains our data ready to be processed.
    $("#state").html(response.name + ", " + response.sys.country);
    $("#date").html(new Date().toLocaleDateString());
    $("#typeWeather").html(response.weather[0].description);
    $("#temperature").html(Math.round(response.main.temp) + "°");
    $("#degreeMax").html("Max: " + Math.round(response.main.temp_max) + "°");
    $("#degreeMin").html("Min: " + Math.round(response.main.temp_min) + "°");
    $("#humidity").html("Humidité: " + response.main.humidity + " %");
    $("#windSpeed").html("Vent: " + response.wind.speed + " m/s");

    // One image as a function of weather for each day.
    if (response.weather[0].main === "Cloudy"){
        $("#imageWeather").attr("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/sun-behind-cloud_26c5.png");
    }
    else if(response.weather[0].main === "Clouds"){
        $("#imageWeather").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud_2601-fe0f.png");
    }
    else if (response.weather[0].main === "Fog" || response.weather[0].main === "Haze" || response.weather[0].main === "Mist") {
        $("#imageWeather").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/fog_1f32b-fe0f.png");
    }
    else if(response.weather[0].main === "Rain"){
        $("#imageWeather").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-rain_1f327-fe0f.png");
    }
    else if (response.weather[0].main === "Clear"){
        $("#imageWeather").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/sun_2600-fe0f.png");
    }
    else if (response.weather[0].main === "Snow"){
        $("#imageWeather").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-snow_1f328-fe0f.png");
    }
    else if (response.weather[0].main === "Lightning"){
        $("#imageWeather").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-lightning_1f329-fe0f.png");
    }
});

let url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=49.99&lon=4.1005&lang=fr&units=metric&exclude=minutely,hourly,alerts&appid=f5c382e18131ee20c243227653a7d50c";

$.get(url2, function () {
    //day 1 --> tomorrow
    days("#date1", "#degreeMax1", "#degreeMin1", 1, 0);
    imageWeather(0, "#imageWeather1");
    //day 2
    days("#date2","#degreeMax2", "#degreeMin2", 2, 1);
    imageWeather(1, "#imageWeather2");
    //day 3
    days("#date3", "#degreeMax3", "#degreeMin3", 3, 2);
    imageWeather(2, "#imageWeather3");
    //day 4
    days("#date4", "#degreeMax4", "#degreeMin4", 4, 3)
    imageWeather(3, "#imageWeather4");
});

/**
 * One image as a function of weather for each day.
 * @param i
 * @param id
 */
function imageWeather(i, id) {
    $.get(url2, function (response) {
        if (response.daily[i].weather[0].main === "Cloudy") {
            $(id).attr("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/sun-behind-cloud_26c5.png");
        }
        else if (response.daily[i].weather[0].main === "Clouds") {
            $(id).attr("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud_2601-fe0f.png");
        }
        else if (response.daily[i].weather[0].main === "Fog" || response.daily[i].weather[0].main === "Haze" || response.daily[i].weather[0].main === "Mist") {
            $(id).attr("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/fog_1f32b-fe0f.png");
        }
        else if (response.daily[i].weather[0].main === "Rain") {
            $(id).attr("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-rain_1f327-fe0f.png");
        }
        else if (response.daily[i].weather[0].main === "Clear") {
            $(id).attr("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/sun_2600-fe0f.png");
        }
        else if (response.daily[i].weather[0].main === "Snow") {
            $(id).attr("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-snow_1f328-fe0f.png");
        }
        else if (response.daily[i].weather[0].main === "Lightning") { //nuage avec éclair
            $(id).attr("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-lightning_1f329-fe0f.png");
        }
    });
}

/**
 * The function allows you to add more days for the date, to set the max and min degrees as a function of i for the day.
 * @param idDate
 * @param idWeatherMax
 * @param idWeatherMin
 * @param days
 * @param i
 */
function days(idDate, idWeatherMax, idWeatherMin, days, i) {
    $.get(url2, function (response) {
        let aujourdhui = new Date();
        if (parseInt(aujourdhui.getMonth() + 1) < 10) {
            $(idDate).html((aujourdhui.getDate() + days) + "/" + "0" + parseInt(aujourdhui.getMonth() + 1) + "/" + aujourdhui.getFullYear());
        }
        else {
            $(idDate).html((aujourdhui.getDate() + days) + "/" + parseInt(aujourdhui.getMonth() + 1) + "/" + aujourdhui.getFullYear());
        }
        $(idWeatherMax).html($(idWeatherMax).html() + Math.round(response.daily[i].temp.max) + "°");
        $(idWeatherMin).html($(idWeatherMin).html() + Math.round(response.daily[i].temp.min) + "°");
    });
}
