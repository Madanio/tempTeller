let id = '28467ac101f716fb06ef9b749da5ca70';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('searchValue');  // Updated this line to match the correct ID
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if(valueSearch.value.trim() !== ''){  // Added trim() to remove any extra spaces
        searchWeather();
    } else {
        alert("Please enter a city name!");  // Added an alert for empty input
    }
});

const searchWeather = () => {
    fetch(url + '&q=' + encodeURIComponent(valueSearch.value))  // Added encodeURIComponent to handle special characters
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.cod == 200){
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = Math.round(data.main.temp);  // Added Math.round for cleaner temperature display
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';  // Clear the search input after submission
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
}

// search Default
const initApp = () => {
    valueSearch.value = 'washington';
    searchWeather();
}
initApp();
