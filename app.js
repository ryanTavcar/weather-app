import { Weather } from './weather.js';


// GLOBAL VARIABLES
const APIkey = 'foib34ov28p93y51kjljhbf98yp';

const form = document.getElementById('form');

// For the units of measurements i.e Metric or imperial
let unit = 'metric';

const weatherObject = {};


//Functions

// @descriptions: 
// @params: none
// @return: API data in json format
const getData = async () => {
    try {
        const cityName = document.getElementById('input').value;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${APIkey}`);
        const data = await response.json();

        clearForm();

        return data;

    } catch (err) {
        throw new Error(err.message);
    }
}

// @descriptions: 
// @params: none
// @return: Clear input value from form when clicked submit
const clearForm = () => {
    return document.getElementById('input').value = '';
}


// @descriptions: Console.log the error that may occur when getting API
// @params: error
// @return: 
const apiError = (error) => {
    console.log(error);

    document.getElementById('hide-alert').setAttribute('id', 'show-alert');
    const alertDiv = document.getElementById('show-alert') 
    alertDiv.innerHTML = 'City Not Found';

    // Timeout after 3 sec
    
    setTimeout(function(){

        let toggle = document.getElementById('show-alert')
        toggle.id = 'hide-alert';
        toggle.innerHTML = '';
    }, 
    3000);

    return;
}

// @descriptions: Console.log the JSON data from API
// @params: data
// @return
const displayData = (data) => {
    console.log(data);
    return;
}

// @descriptions: 
// @params:
// @return
const formHandler = (event) => {
    event.preventDefault();
    getData()
    //.then(displayData)
    .then(asssembleData)
    .then(createWeatherObject)

    .catch(apiError);

}

// @descriptions: Assembles data from JSON/API into an object literal to easier make weather card
// @params: getData function which returns JSON data
// @return: weatherObject Object Literal
const asssembleData = (data) => {

    displayData(data);

    const {main,wind,weather,name} = data;

    weatherObject.cityName    = name;
    weatherObject.currentTemp = main.temp;
    weatherObject.maxTemp     = main.temp_max;
    weatherObject.minTemp     = main.temp_min;
    weatherObject.feelsLike   = main.feels_like;
    weatherObject.humidity    = main.humidity;
    weatherObject.icon        = weather[0].icon;
    weatherObject.windspeed   = wind.speed;
    weatherObject.description = weather[0].description;
    weatherObject.icon        = weather[0].icon;

    return;
}

// @descriptions: Create Card using Weather Class
// @params: none
// @return: 
const createWeatherObject =  async () => {

    const weather = new Weather(weatherObject)

    weather.displayWeather();

    return;
    
}

// Event Listener
form.addEventListener('submit', formHandler)

document.getElementById("metric-button").addEventListener('click', (event) => {
    event.preventDefault();
    unit = "metric"
});
    

document.getElementById("imperial-button").addEventListener('click', (event) => {
    event.preventDefault();
    unit = "imperial"
});

// Imperial button and Matric button
function clickSwitch() {
    'use strict';
    var isA = 0;
    var btnA = document.getElementById('metric-button');
    var btnB = document.getElementById('imperial-button');
   
    function setState(isA) {
      btnA.className = (isA == 0) ? 'btn inactive' : 'btn'; 
      btnB.className = (isA == 1) ? 'btn inactive' : 'btn'; 
    }
    setState(0);
   
    btnA.addEventListener('click', function(){
      if (isA == 0) return;
      isA = 0;
      setState(0);
    });
    btnB.addEventListener('click', function(){
      if (isA == 1) return;
      isA = 1;
      setState(1);
    });
  };
  document.addEventListener("DOMContentLoaded", clickSwitch, false);

