var apiKey = "f50d4e4ff9dde554472432d69049aa55";

var cityInput = $(".cityInput");
var searchBtn = $(".searchBtn");

var temperatureEl = $(".temp");
var humidityEl = $(".humidity");
var uvIndexEl = $(".uvIndex");
var windSpeedEl = $(".windSpeed");
var cardRow = $(".card-row");

var cityName = $(".cityName");
var todaysDate = $(".todaysDate");
var weatherIcon = $(".weatherIcon");
var cityHistory = $("cityHistory");

// style update function from other homework to be used on UV Index

setInterval(function(){styleUpdate() }, 900000);

var date =$("todaysDate").text(moment().format("MM/DD/YYYY"));
todaysDate.text('($date})')


src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js">
console.log((moment(todaysDate).format("MM/DD/YYYY")))
// moment(testDate).format('MM/DD/YYYY');

searchBtn.on("click", function(e) {
    console.log("clicked button")
    getWeather(cityInput.val());
});