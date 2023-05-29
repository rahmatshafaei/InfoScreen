import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetWeatherData = () => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = 'd24b2947b080ed917d13b74a40cd5e2e';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
          .then(response => {
            setWeather(response.data);
            setIsLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  if (isLoading) {
    return <div>Loading weather data...</div>;
  }

  const { name, main, weather: weatherDescription } = weather;

  return (
    <div>
  <h2>{name}</h2>
  <p className="weather-description">{weatherDescription[0].description}</p>
  <p className="temperature">{Math.round(main.temp)}°C</p>

</div>
  );
};

export default GetWeatherData;
