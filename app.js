let url = "https://api.openweathermap.org/data/2.5/weather?q=anor&units=metric&lang=fr&appid=f5c382e18131ee20c243227653a7d50c";

$.get(url, function (response) {
    $("#state").html(response.name + ", " + response.sys.country);
    $("#date").html(new Date().toLocaleDateString());
    $("#typeTemps").html(response.weather[0].description);
    $("#temperature").html(Math.round(response.main.temp) + "°");
    $("#tempsMax").html("Max: " + Math.round(response.main.temp_max) + "°");
    $("#tempsMin").html("Min: " + Math.round(response.main.temp_min) + "°");
    $("#humidity").html("Humidité: " + response.main.humidity + " %");
    $("#windSpeed").html("Vent: " + response.wind.speed + " m/s");

    if (response.weather[0].main === "Cloudy"){ //soleil avec nuage
        $("#imageTemps").attr("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/sun-behind-cloud_26c5.png");
    }
    else if(response.weather[0].main === "Clouds"){ //nuages
        $("#imageTemps").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud_2601-fe0f.png");
    }
    else if (response.weather[0].main === "Fog" || response.weather[0].main === "Haze" || response.weather[0].main === "Mist") { //brouillard et brume
        $("#imageTemps").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/fog_1f32b-fe0f.png");
    }
    else if(response.weather[0].main === "Rain"){ //nuage avec pluie
        $("#imageTemps").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-rain_1f327-fe0f.png");
    }
    else if (response.weather[0].main === "Clear"){ //soleil
        $("#imageTemps").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/sun_2600-fe0f.png");
    }
    else if (response.weather[0].main === "Snow"){ //nuage avec neige
        $("#imageTemps").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-snow_1f328-fe0f.png");
    }
    else if (response.weather[0].main === "Lightning"){ //nuage avec éclair
        $("#imageTemps").attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-lightning_1f329-fe0f.png");
    }
})

let url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=49.99&lon=4.1005&lang=fr&units=metric&exclude=minutely,hourly,alerts&appid=f5c382e18131ee20c243227653a7d50c";

$.get(url2, function (response) {
    //jour 1 --> demain
    jours("date1", "tempsMax1", "tempsMin1", 1, 0);
    imageTemps(0, "imageTemps1");

    //Jour 2
    jours("date2","tempsMax2", "tempsMin2", 2, 1);
    imageTemps(1, "imageTemps2");

    //Jour 3
    jours("date3", "tempsMax3", "tempsMin3", 3, 2);
    imageTemps(2, "imageTemps3");

    //Jour 4
    jours("date4", "tempsMax4", "tempsMin4", 4, 3)
    imageTemps(3, "imageTemps4");
})

function imageTemps(i, id, response){
    if (response.daily[i].weather[0].main === "Cloudy"){ //soleil avec nuage
        $(id).attr("src", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/sun-behind-cloud_26c5.png");
    }
    else if(response.daily[i].weather[0].main === "Clouds"){ //nuages
        $(id).attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud_2601-fe0f.png");
    }
    else if (response.daily[i].weather[0].main === "Fog" || response.daily[i].weather[0].main === "Haze" || response.daily[i].weather[0].main === "Mist") { //brouillard et brume
        $(id).attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/fog_1f32b-fe0f.png");
    }
    else if(response.daily[i].weather[0].main === "Rain"){ //nuage avec pluie
        $(id).attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-rain_1f327-fe0f.png");
    }
    else if (response.daily[i].weather[0].main === "Clear"){ //soleil
        $(id).attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/sun_2600-fe0f.png");
    }
    else if (response.daily[i].weather[0].main === "Snow"){ //nuage avec neige
        $(id).attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-snow_1f328-fe0f.png");
    }
    else if (response.daily[i].weather[0].main === "Lightning"){ //nuage avec éclair
        $(id).attr("src","https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/271/cloud-with-lightning_1f329-fe0f.png");
    }
}

function jours(idDate,idTempsMax,idTempsMin,jours,i,response) {
    let aujourdhui = new Date();
    $(idDate).html((aujourdhui.getDate() + jours) + "/" + aujourdhui.getMonth() + 1 + "/" + aujourdhui.getFullYear());
    $(idTempsMax).html($(idTempsMax).html() + Math.round(response.daily[i].temp.max) + "°");
    $(idTempsMin).html($(idTempsMin).html() + Math.round(response.daily[i].temp.min) + "°");
}

console.log($.get(url2));
console.log($.get(url));