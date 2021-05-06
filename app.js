import { Weather } from './weather.js';

// GLOBAL VARIABLES
const APIkey = 'f18b6ae1c57f039f48f95ade89757557';

const form = document.getElementById('form');

// For the units of measurements i.e Metric or imperial
let unit = 'metric';

const weatherObject = {};

// Object for regular used dom elements
const dom = {
    appName       : document.getElementById('navbar-brand-id'),
    metricButton  : document.getElementById('metric-button'),
    imperialButton: document.getElementById('imperial-button'),
    dropdown      : document.getElementById('navbarDropdown'),
    formButton    : document.getElementById('button'),
}

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

// @descriptions: 
// @params: event
// @return:
// const formHandler2 = (event) => {
//     event.preventDefault();
//     getData().then(getWeather).catch(apiError);
// }

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
    weatherObject.windspeed   = wind.speed;
    weatherObject.description = weather[0].description;
    weatherObject.icon        = weather[0].icon;

    return;
}

// @descriptions: 
// @params: none
// @return
const createCard = () => {
    console.log(weatherObject.currentTemp)

}

// @descriptions: Create Card using Weather Class
// @params: none
// @return: 
const createWeatherObject =  async () => {
    
    const weather =  new Weather(weatherObject)

    weather.displayWeather();

    return;
}

const waitForCard = () => {
    return new Promise( (resolve, reject) => {
        resolve(document.getElementsByClassName('card')[0]);
    })
    //console.log(cardElement)
    //cardElement.style.borderColor = 'green'
}


// Event Listener
form.addEventListener('submit', formHandler)

let elements = document.getElementsByClassName('dropdown-item');

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', colorUI)  
}


document.getElementById("metric-button").addEventListener('click', (event) => {
    event.preventDefault();
    unit = "metric"
});
    

document.getElementById("imperial-button").addEventListener('click', (event) => {
    event.preventDefault();
    unit = "imperial"
});