//const {Weather} = require('./weather');


const APIkey = 'f18b6ae1c57f039f48f95ade89757557';

const weatherObject = {}

const colorScheme = [
    { name: 'crimson'       , rgb: 'rgb(220,20,60)'  , hex: '#DC143C' },
    { name: 'maroon'        , rgb: 'rgb(128,0,0)'    , hex: '#800000' },
    { name: 'forestgreen'   , rgb: 'rgb(34,139,34)'  , hex: '#228B22' },
    { name: 'seagreen'      , rgb: 'rgb(46,139,87)'  , hex: '#2E8B57' },
    { name: 'skyblue'       , rgb: 'rgb(135,206,235)', hex: '#87CEEB' },
    { name: 'indigo'        , rgb: 'rgb(75,0,130)'   , hex: '#4B0082' }
]



const form = document.getElementById('form');
let unit = undefined;

class Weather {

    constructor(weatherObject) {
        this.weather = weatherObject;
    }

    displayWeather() {
        const {cityName, currentTemp, maxTemp, minTemp, feelsLike, humidity, windspeed, description, icon} = this.weather;
    
        const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
        const newDiv = document.createElement("div");
        newDiv.class = 'weather-card';
        let ifTrue = true;
        while (ifTrue) {
            newDiv.innerHTML = 
            `
            <div class='card'>
                <h2 class='header'>${cityName}</h2>
                <img id='icon' src=${iconURL} alt='weather icon'>
                <p class='card-current-temp'><strong>Current Temp:</strong> ${currentTemp}</p>
                <p class='card-description'><strong>Description:</strong> ${description}</p>
                <p class='card-max-temp'><strong>Max Temp:</strong> ${maxTemp}</p>
                <p class='card-min-temp'><strong>Min Temp:</strong> ${minTemp}</p>
                <p class='card-feels-like'><strong>Feels Like:</strong> ${feelsLike}</p>
                <p class='card-humidity'><strong>Humidity:</strong> ${humidity}</p>
                <p class='card-windspeed'><strong>Windspeed:</strong> ${windspeed}</p>
            </div`
        
            const section = document.getElementById('weather-container');
            section.appendChild(newDiv);

            ifTrue = false
        }

    
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
    console.log(`API DATA: ${data}`)
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
    weatherObject.windspeed   = wind.speed;
    weatherObject.description = weather[0].description;
    weatherObject.icon        = weather[0].icon;

    return 
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

const createWeatherObject =  async () => {
    
    const weather =  new Weather(weatherObject)

    weather.displayWeather();

}


form.addEventListener('submit', formHandler );
