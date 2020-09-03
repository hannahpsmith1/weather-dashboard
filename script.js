const PLACEHOLDER_KEY = "PLACEHOLDER";
const API_KEY = "314f8e60676745089873728b30174cc3";
const wbEndPt = "https://api.weatherbit.io/v2.0/";
var searchHistory = [];
var searchInput = '';
var todaysWeather = {};
var forecastWeatherArr = [];
var city;
var today = (moment().format('ddd, MMMM DD, YYYY'));




// what to do when you click search
function click() {
    $("#search").on("click", function (e) {
        e.preventDefault();
        console.log("You clicked a button!");
        getCityWeather().then(addToCityList());
    });
}

// city you're querying
function getCity() {
    let city = $('#city').val();
    console.log("You're searching for weather in " + city);
    saveSearchHistory(city);
    return city;
}

//saves the search history to local storage
function saveSearchHistory(searchInput) {
    searchHistory.push(searchInput);
    localStorage.setItem(PLACEHOLDER_KEY, JSON.stringify(searchHistory));
}

//ADDS CITY TO LIST BOX <-----THIS FUNCTION NOT WORKING PROPERLY
function addToCityList() {
    if (searchHistory) {
        searchHistory = JSON.parse(localStorage.getItem(PLACEHOLDER_KEY));
        $('#searchedCityList').append(searchHistory.city);
        console.log(searchHistory);
    }
}

const testIcon = "https://www.weatherbit.io/static/img/icons/c01d.png";
const iconHub = "https://www.weatherbit.io/static/img/icons/";
var iconSrc;
var iconCode;


function weatherNow(endpturl, loc) {
    var cityHead = loc;
    $.ajax({
        url: endpturl,
        method: "GET"
    }).then(function (response) {
        var weatherData = response.data[0];
        if (!weatherData) {
            return;
        }

        $("#icon img").remove(); 
        todaysWeather.location = $("#city").text(cityHead);
        todaysWeather.date = $("#date").text(today);
        todaysWeather.currentTemp = $("#temp").text(weatherData.app_temp + '°F');
        todaysWeather.currentHumidity = $("#humidity").text(weatherData.rh + '%');
        todaysWeather.currentWindSpeed = $("#windspeed").text(weatherData.wind_spd + 'mph');
        todaysWeather.currentUV = $("#uv").text(weatherData.uv);
        todaysWeather.currentAQI = $("#aqi").text(weatherData.aqi);
        todaysWeather.iconCode = $("#icon").append(`<img src=` + iconHub + weatherData.weather.icon + `.png/>`);
        todaysWeather.description = $("#today-weather-description").text(weatherData.weather.description);
        iconCode = todaysWeather.iconCode;
        uvColor(todaysWeather.currentUV);
        aqiColor(todaysWeather.currentAQI);
    });
}


function weatherForecast(endpturl) {
    $.ajax({
        url: endpturl,
        method: "GET"
    }).then(function (response) {
        var date;
        let currentData;
        let numOfDays = response.data.length;

        $("#fivedayDiv").html('');

        for (var i = 0; i < numOfDays; i++) {
            currentData = response.data[i];
            date = (moment(currentData.datetime).format('ddd MMMM Do'));
            iconSrc = (iconHub + currentData.weather.icon + ".png");

            $("#forecastDiv").append(`<div class="col-2"><div class="card" style="width: 100%">
            <div class="card-body"><img src=${iconSrc} class="card-img-top" />
            <h4 class="card-title text-center">${date}</h4>
            <div class="text-center">Low: ${currentData.min_temp}&deg;F</div>
            <div class="text-center">High: ${currentData.max_temp}&deg;F</div>
            <div class="text-center">Humidity: ${currentData.rh}%</div>
            </div></div></div>`);
        }
    });
}


async function getCityWeather() {
    var paramsCurrent = "current" + "?key=" + API_KEY + "&units=i&city=";
    var url = wbEndPt;
    city = getCity();
    paramsCurrent += city;
    url += paramsCurrent;
    await weatherNow(url, city);
    getForecastData();
}

function getForecastData() {
    var paramsCurrent = "forecast/daily" + "?key=" + API_KEY + "&units=i&city=" + city + "&days=5";
    var url = wbEndPt;
    url += paramsCurrent;
    weatherForecast(url);
    // const forecastQueryURL = "http://api.weatherbit.io/v2.0/forecast/daily?key=314f8e60676745089873728b30174cc3&units=i&city=Novato, CA&days=5";
}
//====================================================================

function uvColor(uv) {
    console.log("uv is " + JSON.stringify(uv));
    if (uv < 2) {
        $('#current-uv').addClass('low') //green
    } else if (uv > 3 && uv < 6) {
        $('#current-uv').addClass('mid') //yellow
    } else if (uv > 5 && uv < 8) {
        $('#current-uv').addClass('high') //red
    } else {
        $('#current-uv').addClass('low') //green
    }
}


$(document).ready(function () {
    click();
    getCityWeather();
});