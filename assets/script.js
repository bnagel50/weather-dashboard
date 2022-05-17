var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");
var APIKey = "862fdaa7f4383326d44318f27fde2561";

var latitude;
var longitude;
var searchTerm;
var currentWeather;
var futureWeather;
var date;
var icon;
var wind;
var uvIndex;

var formSubmitHandler = function(event) {
    event.preventDefault();

    
    var city = cityInputEl.value.trim();

    if (city) {
        getCoords(city);
        getWeather(latitude, longitude);
        displayWeather(searchTerm, currentWeather, futureWeather, date, icon, wind, uvIndex);
        weatherContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a valid city');
    }
};

var getCoords = function(city) {
    var coordApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;
    fetch(coordApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var latitude = data[0].lat;
            var longitude = data[0].lon;
            getWeather(latitude, longitude);
        });
};

var getWeather = function(latitude, longitude) {
    console.log(latitude);
    console.log(longitude);
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var currentWeather = data.temp;
            var futureWeather = data.daily;
            var date = data.current.dt;
            // var icon = data.weather.icon;
            var wind = data.wind_speed;
            var uvIndex = data.current.uvi;
            console.log(data);
            displayWeather(searchTerm, currentWeather, futureWeather, date, icon, wind, uvIndex);
        });
} 
        
    

var displayWeather = function(searchTerm, currentWeather, futureWeather, date, icon, wind, uvIndex) {
    citySearchTerm.textContent = searchTerm;

    var weatherEl = document.createElement("a");
    weatherEl.classList = "flex-row list-item align-center justify-space-between";
    weatherEl.append(currentWeather);
    weatherEl.append(futureWeather);
    weatherEl.append(date);
    weatherEl.append(icon);
    weatherEl.append(wind);
    weatherEl.append(uvIndex);
    
    var titleEl = document.createElement("span");
    titleEl.textContent = searchTerm;

    weatherEl.appendChild(titleEl);

    weatherContainerEl.appendChild(weatherEl);
};

cityFormEl.addEventListener('submit', formSubmitHandler);