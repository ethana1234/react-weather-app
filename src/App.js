import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';

function App() {

    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const handleOnSearchChange = (searchData) => {
        // On search change, update the current weather info
        const [lat, lon] = searchData.value.split(" "); // Pull lat/long from our search result

        const generateUrl = (path) => {
            return `${WEATHER_API_URL}${path}?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`;
        };

        const currentWeatherFetch = fetch(generateUrl("/weather"));
        const forecastFetch = fetch(generateUrl("/forecast"));

        // Run each API call asynchronously
        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({ city: searchData.label, ...weatherResponse });
                setForecast({ city: searchData.label, ...forecastResponse });
            })
            .catch((err) => console.error(err));
    }

    const hours = new Date().getHours();
    const isDayTime = hours > 6 && hours < 20;
    return (
        <div className={(isDayTime) ? 'container' : 'container night'}>
            <Search onSearchChange={handleOnSearchChange} />
            {currentWeather && <CurrentWeather data={currentWeather} />} {/* Check if there's data to present, if there is, display the component */}
            {forecast && <Forecast data={forecast} />}
        </div>
    );
}

export default App;
