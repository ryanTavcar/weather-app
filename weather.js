export class Weather {

    constructor(weatherObject) {
        this.weather = weatherObject;
    }

    displayWeather() {
        const {cityName, description, icon} = this.weather;
        const {currentTemp, maxTemp, minTemp, feelsLike, humidity, windspeed} = this.removedDecimal();
    
        const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
        const newDiv = document.createElement("div");
        newDiv.class = 'weather-card';
        newDiv.innerHTML = 
        `
        <div class='card'>
            <p class='card-current-temp'>${currentTemp}°</p>
            <p class='card-feels-like'><strong>Feels Like:</strong> ${feelsLike}</p>

            <img id='icon' src=${iconURL} alt='weather icon'>

            <div class="temp">
            <p class='card-temp'><span class="maxtemp">${maxTemp}°</span>/${minTemp}°</p>
            <p class='card-description'>${description}</p>
            </div>

            <h2 class='header'>${cityName}</h2>
            <p class='card-humidity'><strong>Humidity:</strong> ${humidity}</p>
            <p class='card-windspeed'><strong>Windspeed:</strong> ${windspeed}</p>
        </div>`
    
        const section = document.getElementById('weather-container');
        section.appendChild(newDiv);

        
        return;
    }

    removedDecimal() {
        let {currentTemp, maxTemp, minTemp, feelsLike, humidity, windspeed} = this.weather;

        currentTemp = Math.trunc(currentTemp);
        maxTemp = Math.trunc(maxTemp);
        minTemp = Math.trunc(minTemp);
        feelsLike = Math.trunc(feelsLike);
        humidity = Math.trunc(humidity);
        windspeed = Math.trunc(windspeed);
        return {
            currentTemp,
            maxTemp,
            minTemp,
            feelsLike,
            humidity,
            windspeed
        }
    }


}
