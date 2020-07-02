
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

if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("no history")
}else{
    console.log("yes history");
    appendSearchHistory();
}

console.log("local storage check worked");

searchBtn.on("click", function(x) {
    console.log("search button")
    getCurrentWeather(cityInput.val());
});


$(document).on("click", function(y) {
    var thisElement = $(this);
    getCurrentWeather(thisElement.text());
})

getSearchHistory();


function getSearchHistory (){
    localStorage.getItem ("cityList")
    appendSearchHistory();

}
console.log("hhelp")
getCurrentWeather();

function appendSearchHistory(placeholderCity){
    var cityHistoryArray =localStorage.getItem(".cityHistory");
    for (var i = 0; i < cityHistoryArray.length; i++) {
        var newCity = $("<li>").attr("class", "newCity");

        newCity.text(cityHistoryArr[i]);
        cityHistory.prepend(placeholderCity);
    }
}

console.log("54")

function getCurrentWeather (searchCity) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&APPID=" + apiKey + "&units=imperial";
// I'm getting a 400 error here
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(weatherDetails){
        var obj = {
            name: weatherDetails.name,
            temp: weatherDetails.main.temp,
            humidity: weatherDetails.main.humidity,
            windSpeed: weatherDetails.wind.speed,
            UVIndex: weatherDetails.coord,
            iconName: weatherDetails.weather [0].icon
        }
    })
    appendCurrentWeather ();
}

function appendCurrentWeather (name, temp, humidity, windSpeed, UVIndex, iconName) {
    cityName.text(name)
    todaysDate.text('($date})')
    cityTemp.text("Temperature:" + temp)
    cityHum.text ("Humidity:" + humidity + "%")
    cityWS.text(" Wind Speed:" + windSpeed + "MPH")
    cityUV.text("UV Index:" + UVIndex)
    weatherIcon.attr ("src", iconName)


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
