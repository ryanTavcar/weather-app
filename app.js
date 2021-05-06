//const {Weather} = require('./weather');


const APIkey = 'f18b6ae1c57f039f48f95ade89757557';

const weatherObject = {}

const form = document.getElementById('form');
let unit = undefined;


function Weather(weatherobject) {
    this.id = 0
    this.weather = weatherobject;
    //this.date = date;
}

Weather.prototype.displayWeather = (weatherObject) => {
    const {cityName, currentTemp, maxTemp, minTemp, feelsLike, humidity, windspeed, description, icon} = weatherObject;
    
    const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
    let item = 8;
    const newDiv = document.createElement("div");
    newDiv.class = 'weather-card'
    while (item--) {
        newDiv.innerHTML = 
        `
        <div class='card'>
            <h2 class='header'>${cityName}</h2>
            <img id='icon' src=${iconURL} alt='weather icon'>
            <p class='card-current-temp'><strong>Current Temp:</strong> ${currentTemp}</p>
            <p class='card-description'><strong>Description:</strong> ${description}</p>
            <img src=
            <p class='card-max-temp'><strong>Max Temp:</strong> ${maxTemp}</p>
            <p class='card-min-temp'><strong>Min Temp:</strong> ${minTemp}</p>
            <p class='card-feels-like'><strong>Feels Like:</strong> ${feelsLike}</p>
            <p class='card-humidity'><strong>Humidity:</strong> ${humidity}</p>
            <p class='card-windspeed'><strong>Windspeed:</strong> ${windspeed}</p>
        </div`
    
        const section = document.getElementById('weather-container');
        section.appendChild(newDiv);
    }

}


const getData = async () => {
    try {
        const cityName = inputValue();
        const unit = 'metric' //unit
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${APIkey}`);
        const data = await response.json();
        return data
    } catch (err) {
        throw new Error(console.error(err.message))
    }
}

const inputValue = () => {
    const cityName = document.getElementById('input').value;
    return cityName
}

const apiError = (error) => {
    console.error(error);
}

const displayData = (data) => {
    console.log(data)
    return
}

const formHandler = (event) => {
    event.preventDefault();
    getData().then(displayData).catch(apiError);
    asssembleData(getData).then(createWeatherObject);

}

const formHandler2 = (event) => {
    event.preventDefault();
    getData().then(getWeather).catch(apiError);
}

form.addEventListener('submit', formHandler)


const asssembleData = async (getData) => {
    const {main,wind,weather,name} = await getData();
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

    return weatherObject
}

const createCard = () => {
    console.log(weatherObject.currentTemp)
    //const weather = new Weather()
}

document.getElementById("metric-button").onclick = function() {
    //  unit = "metric"
  };

document.getElementById("imperial-button").onclick = function() {
    // show imperial
  };

// // get Data (description)
// const getWeather = (data) => {
//     let descriptionDiv = document.getElementById("description")
//     let description = data.weather[0].description; 
//      console.log(description)
//        descriptionDiv.innerText = description 
// }

// form.addEventListener('submit', formHandler2)
const createWeatherObject =  async () => {
    //const weatherObject = await weatherObject
    const weather =  new Weather()
    weather.displayWeather(weatherObject);

    console.log(weatherObject)
}


form.addEventListener('submit', formHandler );
