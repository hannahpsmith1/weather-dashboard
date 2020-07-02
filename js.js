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
    console.log("searchHistory not found")
}else{
    console.log("searchHistory loaded into cityHistoryArr");
    appendSearchHistory();
}

searchBtn.on("click", function(e) {
    console.log("clicked button")
    getCurrentWeather(cityInput.val());
});


// $(document).on("click", ".newCity", function() {
//     console.log("clicked history item")
//     let thisElement = $(this);
//     getWeather(thisElement.text());
// })



function getSearchHistory (){
    localStorage.getItem ("cityList")
    appendSearchHistory();

}

function appendSearchHistory(placeholderCity){
    cityHistory.empty();
    var cityHistoryArr = JSON.parse(localStorage.getItem("cityHistory"));
    // for (var i = 0; i < cityHistoryArr.lengt; i++) {
        var newCity = $("<li>").attr("class", "newCity");

        // newCity.text(cityHistoryArr[i]);
        cityHistory.prepend(placeholderCity);
    // }
}

function getCurrentWeather (searchCity) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&APPID=${apiKey}&units=imperial";
    https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f50d4e4ff9dde554472432d69049aa55

    
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
    appendSearchHistory ();
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

// setInterval(function(){styleUpdate() }, 900000);

// var date =$("todaysDate").text(moment().format("MM/DD/YYYY"));
// todaysDate.text('($date})')


// src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js">
// console.log((moment(todaysDate).format("MM/DD/YYYY")))
// moment(testDate).format('MM/DD/YYYY');
