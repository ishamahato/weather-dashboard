import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { FiEye } from "react-icons/fi";
import { getWeatherIconUrl } from "../services/weatherApi";
import { formatDate, formatTime, getCityTime } from "../utils/formatDate";

/**
 * The main "current weather" card.
 * Shows city, country, local date/time, icon, temperature,
 * condition, feels-like plus a grid of extra stats.
 */
const WeatherCard = ({ weather }) => {
  // The city's local time (OpenWeatherMap gives a timezone offset in seconds)
  const cityTime = getCityTime(weather.timezone);

  // Extra stats rendered as a small grid — defined as data so the JSX stays tidy
  const stats = [
    {
      label: "Humidity",
      value: `${weather.main.humidity}%`,
      icon: <WiHumidity className="text-3xl text-sky-500 dark:text-sky-300" />,
    },
    {
      label: "Wind Speed",
      // API returns m/s in metric units → convert to km/h
      value: `${(weather.wind.speed * 3.6).toFixed(1)} km/h`,
      icon: <WiStrongWind className="text-3xl text-teal-500 dark:text-teal-300" />,
    },
    {
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
      icon: <WiBarometer className="text-3xl text-violet-500 dark:text-violet-300" />,
    },
    {
      label: "Visibility",
      // API returns metres → convert to km
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      icon: <FiEye className="text-2xl text-amber-500 dark:text-amber-300" />,
    },
  ];

  return (
    <section className="glass-card w-full p-6 sm:p-8">
      {/* City name + local date/time */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 sm:text-3xl">
          {weather.name}
          <span className="ml-2 rounded-md bg-sky-500/80 px-2 py-0.5 align-middle text-sm font-medium text-white">
            {weather.sys.country}
          </span>
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {formatDate(cityTime)} • {formatTime(cityTime)} (local time)
        </p>
      </div>

      {/* Icon + temperature + condition */}
      <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
        <img
          src={getWeatherIconUrl(weather.weather[0].icon)}
          alt={weather.weather[0].description}
          className="h-32 w-32 drop-shadow-lg"
        />
        <div className="text-center sm:text-left">
          <p className="text-6xl font-bold text-slate-800 dark:text-white">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="mt-1 text-lg font-medium capitalize text-slate-700 dark:text-slate-200">
            {weather.weather[0].description}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
        </div>
      </div>

      {/* Extra stats grid: 2 columns on mobile, 4 on desktop */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center rounded-xl bg-white/50 p-4
              shadow-sm transition hover:scale-105 dark:bg-slate-700/40"
          >
            {stat.icon}
            <p className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">
              {stat.value}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherCard;
