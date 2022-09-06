import translate from "./translate.js";
import { settings } from "./settings.js";

const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${settings.language}&appid=544fbe8306d90a62c14a4f6f4810e37a&units=metric`;
  const response = await fetch(url);
  const responseBody = await response.json();

  if ('weather' in responseBody) {
    return {
      icon: `owf-${responseBody.weather[0].id}`,
      temperature: `${Math.floor(responseBody.main.temp)}°C`,
      description: responseBody.weather[0].description,
      wind: `${translate[settings.language].weather.windSpeed}: ${Math.floor(responseBody.wind.speed)} ${translate[settings.language].weather.speedUnits}`,
      humidity: `${translate[settings.language].weather.humidity}: ${Math.floor(responseBody.main.humidity)}%`
    };
  } else {
    return { error: responseBody.message };
  }
}

export const updateWeatherData = async () => {
  const inputCityTag = document.querySelector('.city');
  const weatherIconTag = document.querySelector('.weather-icon');
  const temperatureTag = document.querySelector('.temperature');
  const weatherDescriptionTag = document.querySelector('.weather-description');
  const windTag = document.querySelector('.wind');
  const humidityTag = document.querySelector('.humidity');
  const weatherErrorTag = document.querySelector('.weather-error');

  weatherIconTag.className = 'weather-icon owf';
  weatherErrorTag.textContent = temperatureTag.textContent = weatherDescriptionTag.textContent = windTag.textContent = humidityTag.textContent = '';

  const weatherData = await getWeather(inputCityTag.value);

  if ('error' in weatherData) {
    weatherErrorTag.textContent = weatherData.error;
  } else {
    weatherIconTag.classList.add(weatherData.icon);
    temperatureTag.textContent = weatherData.temperature;
    weatherDescriptionTag.textContent = weatherData.description;
    windTag.textContent = weatherData.wind;
    humidityTag.textContent = weatherData.humidity;
  }
}

export const setWeather = () => {
  const inputCityTag = document.querySelector('.city');
  inputCityTag.addEventListener('change', updateWeatherData);

  updateWeatherData();
}
