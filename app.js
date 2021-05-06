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
    { name: 'indigo'        , rgb: 'rgb(75,0,130)'   , hex: '#4B0082' },
    { name: 'dark'          , rgb: 'rgb(39,39,39)'   , hex: '#272727' }
];


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

        document.getElementById('show-alert').remove()
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

const colorUI = (event) => {
    event.preventDefault();

    if (event.target.matches('#dropdown-item1')) {
        document.body.style.backgroundColor = colorScheme[0].rgb;
        //waitForCard().then(cardElement => console.log(cardElement)).catch(error => console.error(error));
    }
    if (event.target.matches('#dropdown-item2')) {
        document.body.style.backgroundColor = colorScheme[1].rgb;
    }
    if (event.target.matches('#dropdown-item3')) {
        document.body.style.backgroundColor = colorScheme[2].rgb;
    }
    if (event.target.matches('#dropdown-item4')) {
        document.body.style.backgroundColor = colorScheme[3].rgb;
    }
    if (event.target.matches('#dropdown-item5')) {
        document.body.style.backgroundColor = colorScheme[4].rgb;
    }
    if (event.target.matches('#dropdown-item6')) {
        document.body.style.backgroundColor = colorScheme[5].rgb;
    } 
    if (event.target.matches('#dropdown-item7')) {
        document.body.style.backgroundColor = colorScheme[6].rgb;
    } 
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
