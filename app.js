//const Weather = require('weather.js')

const form = document.getElementById('form');

const APIkey    = 'f18b6ae1c57f039f48f95ade89757557';

const weatherObject ={}

const getData = async () => {
    try {
        const cityName = inputValue();
        const unit = 'metric'
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
    return data
}

const formHandler = (event) => {
    event.preventDefault();
    getData().then(displayData).catch(apiError);
    asssembleData(getData);
}

const asssembleData = async (getData) => {
    const {main,wind,weather,name} = await getData();
    weatherObject.cityName = name;
    weatherObject.currentTemp = main.temp;
    weatherObject.maxTemp = main.temp_max;
    weatherObject.minTemp = main.temp_min;
    weatherObject.feelsLike = main.feels_like;
    weatherObject.humidity = main.humidity;
    weatherObject.windspeed = wind.speed;
    weatherObject.description = weather[0].description;
    // weatherObject.icon = weather[0].icon;
    console.log(weatherObject)
    //const weather = new Weather()
}

const createCard = () => {
    console.log(weatherObject.currentTemp)
    //const weather = new Weather()
}

form.addEventListener('submit', formHandler )