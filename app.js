

const APIkey    = 'f18b6ae1c57f039f48f95ade89757557';


const getData = async () => {

    const cityName = inputValue();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`);
    const data = await response.json();
    return data
}

const inputValue = () => {
    const cityName = document.getElementById('input').value;
    return cityName
}
inputValue();

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    getData().then(data => console.log(data));
})

