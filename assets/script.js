var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");
var APIKey = "862fdaa7f4383326d44318f27fde2561";


var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    
    if (city) {
        getWeather(city);
        weatherContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a valid city');
    }
};

var getWeather = function(city, APIKey) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    displayWeather(data.items);
                });
            } else {
                alert('Error ' + response.statusText);
            }
        });
};

var displayWeather = function(searchTerm) {
    citySearchTerm.textContent = searchTerm;

    var weatherEl = document.createElement("a");
    weatherEl.classList = "flex-row list-item align-center justify-space-between"

    var titleEl = document.createElement("span");
    titleEl.textContent = city;

    weatherEl.appendChild(titleEl);

    weatherContainerEl.appendChild(weatherEl);
};

cityFormEl.addEventListener('submit', formSubmitHandler);