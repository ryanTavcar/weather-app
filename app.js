//const Weather = require('weather.js')

const form = document.getElementById('form');


const form = document.getElementById('form');
const APIkey    = 'f18b6ae1c57f039f48f95ade89757557';

let weatherObject ={}

const weatherObject = {}


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

const formHandler2 = (event) => {
    event.preventDefault();
    getData().then(getWeather).catch(apiError);
}

// get Data (description)
const getWeather = (data) => {
    let descriptionDiv = document.getElementById("description")
    let description = data.weather[0].description; 
     console.log(description)
       descriptionDiv.innerText = description 
}

form.addEventListener('submit', formHandler2)

form.addEventListener('submit', formHandler)


const asssembleData = async (getData) => {
    const {main} = await getData();
    weatherObject.currentTemp = main.temp;
    console.log(weatherObject)
    //const weather = new Weather()
}

}

const createCard = () => {
    console.log(weatherObject.currentTemp)
    //const weather = new Weather()
}
