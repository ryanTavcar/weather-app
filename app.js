import { Weather } from './weather.js';

// GLOBAL VARIABLES
const APIkey = 'f18b6ae1c57f039f48f95ade89757557';

const form = document.getElementById('form');

let unit = undefined;

const weatherObject = {};

const colorScheme = [
    { name: 'crimson'       , rgb: 'rgb(220,20,60)'  , hex: '#DC143C' },
    { name: 'maroon'        , rgb: 'rgb(128,0,0)'    , hex: '#800000' },
    { name: 'forestgreen'   , rgb: 'rgb(34,139,34)'  , hex: '#228B22' },
    { name: 'seagreen'      , rgb: 'rgb(46,139,87)'  , hex: '#2E8B57' },
    { name: 'skyblue'       , rgb: 'rgb(135,206,235)', hex: '#87CEEB' },
    { name: 'indigo'        , rgb: 'rgb(75,0,130)'   , hex: '#4B0082' }
];


//Functions

// @descriptions: 
// @params: none
// @return: API data in json format
const getData = async () => {
    try {
        const cityName = inputValue();
        const unit = 'metric';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${APIkey}`);
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(console.error(err.message));
    }
}

// @descriptions: 
// @params: none
// @return: return user input value of city name
const inputValue = () => {
    const cityName = document.getElementById('input').value;
    return cityName;
}

// @descriptions: Console.log the error that may occur when getting API
// @params: error
// @return: 
const apiError = (error) => {
    console.error(error);
    return;
}

// @descriptions: Console.log the JSON data from API
// @params: data
// @return
const displayData = (data) => {
    console.log(`API DATA: ${data}`);
    return;
}

// @descriptions: 
// @params:
// @return
const formHandler = (event) => {
    event.preventDefault();
    getData().then(displayData).catch(apiError);
    asssembleData(getData).then(createWeatherObject);

}

// @descriptions: 
// @params: event
// @return:
const formHandler2 = (event) => {
    event.preventDefault();
    getData().then(getWeather).catch(apiError);
}

// @descriptions: Assembles data from JSON/API into an object literal to easier make weather card
// @params: getData function which returns JSON data
// @return: weatherObject Object Literal
const asssembleData = async (getData) => {
    const {main,wind,weather,name} = await getData();
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

// Event Listener
form.addEventListener('submit', formHandler)


document.getElementById("metric-button").onclick = function() {
    //  unit = "metric"
};

document.getElementById("imperial-button").onclick = function() {
    // show imperial
};
