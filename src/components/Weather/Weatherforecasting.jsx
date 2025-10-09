import React, { useState } from 'react';
import './WeatherForecasting.css'; // We will create this CSS file next

// Helper to get a descriptive UV Index rating
const getUviRating = (uvi) => {
  if (uvi < 3) return 'Low';
  if (uvi < 6) return 'Moderate';
  if (uvi < 8) return 'High';
  if (uvi < 11) return 'Very High';
  return 'Extreme';
};

const Weatherforecasting = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "6bdbe64310122a396ea3dbbea6ba3a8d";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setWeatherData(null);
    setError(null);

    try {
      // Step 1: Get latitude and longitude from the city name
      const geoResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!geoResponse.ok) {
        throw new Error('City not found. Please check the spelling.');
      }
      const geoData = await geoResponse.json();
      const { lat, lon } = geoData.coord;
      const fullCityName = `${geoData.name}, ${geoData.sys.country}`;

      // Step 2: Use One Call API to get current weather, alerts, and detailed metrics
      const oneCallResponse = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${API_KEY}&units=metric`
      );
      if (!oneCallResponse.ok) {
        throw new Error('Could not fetch detailed weather data.');
      }
      const oneCallData = await oneCallResponse.json();

      // Combine the data for our state
      setWeatherData({ ...oneCallData, name: fullCityName });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather & Marine Advisory</h1>
      <p className="subtitle">Enter a city to get real-time weather data and official alerts.</p>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="E.g., Mumbai, London, New York"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="results-container">
          <div className="main-info">
            <h2>{weatherData.name}</h2>
            <div className="main-temp-flex">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`}
                alt={weatherData.current.weather[0].description}
              />
              <div className="temp-details">
                <p className="temperature">{Math.round(weatherData.current.temp)}°C</p>
                <p className="description">
                  Feels like {Math.round(weatherData.current.feels_like)}°C. {weatherData.current.weather[0].description}.
                </p>
              </div>
            </div>
          </div>
          
          <hr />

          <h3>Detailed Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-item">
              <h4>Wind</h4>
              <p>{weatherData.current.wind_speed} m/s</p>
              {weatherData.current.wind_gust && <small>Gusts up to {weatherData.current.wind_gust} m/s</small>}
            </div>
            <div className="metric-item">
              <h4>Pressure</h4>
              <p>{weatherData.current.pressure} hPa</p>
              <small>Key storm indicator</small>
            </div>
            <div className="metric-item">
              <h4>Humidity</h4>
              <p>{weatherData.current.humidity}%</p>
              <small>Dew point: {Math.round(weatherData.current.dew_point)}°C</small>
            </div>
            <div className="metric-item">
              <h4>UV Index</h4>
              <p>{weatherData.current.uvi} ({getUviRating(weatherData.current.uvi)})</p>
              <small>Sun protection advice</small>
            </div>
          </div>

          <hr />

          <div className="advisory-section">
            <h3>🚨 Storm & Marine Advisory</h3>
            {weatherData.alerts && weatherData.alerts.length > 0 ? (
              <div className="alerts-list">
                {weatherData.alerts.map((alert, index) => (
                  <div key={index} className="alert-item">
                    <h4>{alert.event}</h4>
                    <p><strong>Source:</strong> {alert.sender_name}</p>
                    <p>{alert.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-advisory">No official weather advisories for this location at the moment. ✅</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weatherforecasting;