
// new API key because getting a 401 error with the old one
var apiKey = "5a64db990c6192cd3e271535b40916f6";

var cityInput = $(".cityInput");
var searchBtn = $(".searchBtn");

var cityName = $(".cityName");
var todaysDate = $(".todaysDate");
var cityTemp = $(".temp");
var cityHum = $(".humidity");
var cityWS = $(".windSpeed");
var cityUV= $(".uvIndex")
var weatherIcon = $(".weatherIcon");
var cityHistory = $(".cityHistory");
var cityHistoryArray= "";

if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("no history")
}else{
    console.log("yes history");
    appendSearchHistory();
}

console.log("local storage check worked");

searchBtn.on("click", function(x) {
    console.log("search button", cityInput.val());
    getCurrentWeather(cityInput.val());
});


// $(document).on("click", function(y) {
//     var thisElement = $(this);
//     getCurrentWeather(thisElement.text());
// })

getSearchHistory();


function getSearchHistory (){
    localStorage.getItem ("cityList")
    appendSearchHistory();

}
console.log("hhelp")
// getCurrentWeather();

function appendSearchHistory(placeholderCity){
    var cityHistoryArray =localStorage.getItem("searchHistory");
    for (var i = 0; i < cityHistoryArray.length; i++) {
        var newCity = $("<li>").attr("class", "newCity");

        newCity.text(cityHistoryArray[i]);
        cityHistory.prepend(placeholderCity);
    }
}

console.log("54")

function getCurrentWeather (searchCity) {
    // console.log(searchCity);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + apiKey + "&units=imperial";
// I'm getting a 400 error here
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(weatherDetails){
        // appendCurrentWeather (name, temp, humidity, windSpeed, UVIndex, iconName);
        var obj = {
            name: weatherDetails.name,
            temp: weatherDetails.main.temp,
            humidity: weatherDetails.main.humidity,
            windSpeed: weatherDetails.wind.speed,
            coordinates: weatherDetails.coord,
            iconName: weatherDetails.weather [0].icon
        }
        appendCurrentWeather (obj.name, obj.temp, obj.humidity, obj.windSpeed, obj.coordinates, obj.iconName);
    })
    // appendCurrentWeather (name, temp, humidity, windSpeed, UVIndex, iconName);
}

function appendCurrentWeather (name, temp, humidity, windSpeed, coordinates, iconName) {
    cityName.text(name)
    todaysDate.text('($date})')
    cityTemp.text("Temperature:" + temp)
    cityHum.text ("Humidity:" + humidity + "%")
    cityWS.text(" Wind Speed:" + windSpeed + "MPH")
    // cityUV.text("UV Index:" + coordinates)
    weatherIcon.attr ("src", iconName)
    console.log(coordinates)
    var uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${coordinates.lat}&lon=${coordinates.lon}`;
        
        $.ajax({
            url: uvURL,
            method: "GET"
        })
        .then(function(weatherDetails){
            cityUV.text("UV Index:" + weatherDetails.value)
            console.log(weatherDetails)
        })



}

function getFiveDay () {

}

function appendFiveDay () {

}




// style update function from other homework to be used on UV Index
// below is what was used in the other homework
// setInterval(function(){styleUpdate() }, 900000);

// working with moment.js to get todays date in the correct format
// var date =$("todaysDate").text(moment().format("MM/DD/YYYY"));
// todaysDate.text('($date})')


// src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js">
// console.log((moment(todaysDate).format("MM/DD/YYYY")))
// moment(testDate).format('MM/DD/YYYY');
