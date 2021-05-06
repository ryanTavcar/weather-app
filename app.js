//const {Weather} = require('./weather');

function Weather(currentWeather) {
    this.currentTemp = currentWeather;
    //this.date = date;
}

Weather.prototype.displayWeather = () => {
    const weatherCard = document.getElementById('weather-card');
    weatherCard.innerText = this.currentTemp;
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
    //createWeatherObject();
}

const asssembleData = async (getData) => {
    const {main} = await getData();
    weatherObject.currentTemp = await main.temp;
    weatherObject.maxTemp = main.temp_max;
    weatherObject.minTemp = main.temp_min;
    console.log('second ' + weatherObject)

    return 
}

const createWeatherObject =  async () => {
    const currentTemp =  await weatherObject.currentTemp
    console.log('third ' + currentTemp)
    const weather =  await new Weather(currentTemp)
    weather.displayWeather(currentTemp);

    return
}


// const createCard = () => {

//     weather.displayWeather()
// }

form.addEventListener('submit', formHandler )