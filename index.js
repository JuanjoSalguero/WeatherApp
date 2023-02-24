// Select DOM elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const input = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Add 'input' event listener to the input
input.addEventListener('input', () => {
    if (input.value !== '' && input.style.color === 'red') {
        input.style.color = 'grey';
    }
});

// Add 'click' event listener to the search button
search.addEventListener('click', () => {
    searchWeather();
});

// Add 'keydown' event listener to the input to detect 'enter'
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchWeather();
        search.click();
    }
});

// Define function to search for weather data
function searchWeather() {
    let previousSearch = null;
    
    // Get API key and city input value
    const APIKey = '35c55d3bd8d684c6a1efac8123fba2bf';
    const city = input.value;

    // Check if city input value is empty
    if (city === '') {
        return;
    }

    // Fetch weather data from API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // Check if city not found
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                input.classList.add('error');
                input.style.color = 'red';
                return;
            }

            // Hide error message if displayed
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Select DOM elements to display weather data
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Select weather icon based on weather conditions
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;

                case 'Rain':
                    image.src = 'img/rain.png';
                    break;

                case 'Snow':
                    image.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'img/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'img/mist.png';
                    break;

                default:
                    image.src = '';
            }

            // Display weather data in DOM
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Show weather data and adjust container height
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
}
