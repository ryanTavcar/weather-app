export function Weather(currentWeather) {
    this.currentWeather = currentWeather;
    this.date = date;
}

Weather.prototype.displayWeather = () => {
    const weatherCard = document.getElementsByClassName('weather-card');
    weatherCard.innerHtml = this.currentWeather;
}

module.exports = {Weather, displayWeather}