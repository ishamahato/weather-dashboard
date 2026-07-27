import { useState } from "react";
import {
  getCurrentWeather,
  getForecast,
  getWeatherByCoords,
  getForecastByCoords,
} from "../services/weatherApi";

/**
 * Groups the 3-hourly forecast list into one entry per day.
 * The /forecast endpoint returns ~40 readings (every 3 hours for 5 days),
 * so we collect them by date and compute each day's min/max temperature.
 */
const groupForecastByDay = (list) => {
  const days = {};

  list.forEach((item) => {
    // "dt_txt" looks like "2026-07-27 12:00:00" — the date part is the key
    const date = item.dt_txt.split(" ")[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });

  const today = new Date().toISOString().split("T")[0];

  return (
    Object.entries(days)
      // Skip today — the dashboard already shows current weather for it
      .filter(([date]) => date !== today)
      .slice(0, 5)
      .map(([date, items]) => {
        // Prefer the midday reading for the icon (most representative),
        // falling back to the first reading of the day
        const midday = items.find((i) => i.dt_txt.includes("12:00")) || items[0];

        return {
          date,
          minTemp: Math.min(...items.map((i) => i.main.temp_min)),
          maxTemp: Math.max(...items.map((i) => i.main.temp_max)),
          icon: midday.weather[0].icon,
          condition: midday.weather[0].main,
        };
      })
  );
};

/**
 * Custom hook that owns all weather state:
 * current weather, 5-day forecast, loading flag and error message.
 *
 * Components just call fetchWeather("Mumbai") or
 * fetchWeatherByCoords(lat, lon) and render the returned state.
 */
const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /** Turns axios errors into friendly, human-readable messages */
  const handleError = (err) => {
    if (err.response) {
      // The server responded with an error status code
      if (err.response.status === 404) {
        setError("City not found. Please check the spelling and try again.");
      } else if (err.response.status === 401) {
        setError(
          "Invalid API key. Add your OpenWeatherMap key to the .env file and restart the dev server."
        );
      } else {
        setError("Something went wrong on the server. Please try again later.");
      }
    } else if (err.request) {
      // The request was sent but no response came back
      setError("Network error. Please check your internet connection.");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  /** Fetch current weather + forecast for a city name. Returns the weather data on success, null on failure. */
  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      // Fetch both endpoints in parallel — faster than one after the other
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);
      setWeather(weatherData);
      setForecast(groupForecastByDay(forecastData.list));
      return weatherData;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /** Fetch current weather + forecast from coordinates (Geolocation API) */
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon),
      ]);
      setWeather(weatherData);
      setForecast(groupForecastByDay(forecastData.list));
      return weatherData;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    forecast,
    loading,
    error,
    setError,
    fetchWeather,
    fetchWeatherByCoords,
  };
};

export default useWeather;
