import { getWeatherIconUrl } from "../services/weatherApi";
import { formatDay, formatShortDate } from "../utils/formatDate";

/**
 * 5-day forecast strip.
 * Receives an already-grouped array from the useWeather hook:
 * [{ date, minTemp, maxTemp, icon, condition }, ...]
 */
const Forecast = ({ forecast }) => {
  // Nothing to show until a forecast has been fetched
  if (!forecast.length) return null;

  return (
    <section className="w-full">
      <h3 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-100">
        5-Day Forecast
      </h3>

      {/* 2 columns on mobile → 3 on tablet → 5 on desktop */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="glass-card flex flex-col items-center p-4 transition hover:scale-105"
          >
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {formatDay(day.date)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {formatShortDate(day.date)}
            </p>

            <img
              src={getWeatherIconUrl(day.icon, "2x")}
              alt={day.condition}
              className="h-16 w-16"
            />
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {day.condition}
            </p>

            {/* Max / min temperatures */}
            <p className="mt-1 text-sm">
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                {Math.round(day.maxTemp)}°
              </span>
              <span className="ml-2 text-slate-500 dark:text-slate-400">
                {Math.round(day.minTemp)}°
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Forecast;
