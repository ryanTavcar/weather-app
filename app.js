//const {Weather} = require('./weather');

function Weather(currentWeather) {
    this.currentTemp = currentWeather;
    //this.date = date;
}

Weather.prototype.displayWeather = (currentTemp) => {
    const weatherCard = document.getElementsByClassName('weather-card');
    weatherCard[0].innerHTML = currentTemp;
}



const form = document.getElementById('form');
const APIkey = 'f18b6ae1c57f039f48f95ade89757557';

const weatherObject = {}


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
    console.log('first' + data)
    return data
}

const formHandler = (event) => {
    event.preventDefault();
    getData().then(displayData).catch(apiError);
    asssembleData(getData).then(createWeatherObject);
}

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

    return 
}

const createWeatherObject =  async () => {
    const currentTemp =  await weatherObject.currentTemp
    const weather =  await new Weather(currentTemp)
    weather.displayWeather(currentTemp);

    console.log(weatherObject)
}


form.addEventListener('submit', formHandler )