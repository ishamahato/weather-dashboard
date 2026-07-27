import axios from "axios";

/**
 * All communication with the OpenWeatherMap API lives in this file.
 * Components never call axios directly — they go through these functions,
 * so the API logic stays in one easy-to-test place.
 */

// The API key comes from the .env file (VITE_WEATHER_API_KEY)
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// A pre-configured axios instance so we don't repeat the base URL
// and common params on every request
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric", // temperatures in °C, wind in m/s
  },
});

/** Current weather for a city name, e.g. "Mumbai" */
export const getCurrentWeather = async (city) => {
  const { data } = await api.get("/weather", { params: { q: city } });
  return data;
};

/** 5-day / 3-hour forecast for a city name */
export const getForecast = async (city) => {
  const { data } = await api.get("/forecast", { params: { q: city } });
  return data;
};

/** Current weather from latitude/longitude (used with the Geolocation API) */
export const getWeatherByCoords = async (lat, lon) => {
  const { data } = await api.get("/weather", { params: { lat, lon } });
  return data;
};

/** 5-day forecast from latitude/longitude */
export const getForecastByCoords = async (lat, lon) => {
  const { data } = await api.get("/forecast", { params: { lat, lon } });
  return data;
};

/** Builds the URL for an official OpenWeatherMap weather icon */
export const getWeatherIconUrl = (iconCode, size = "4x") =>
  `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
