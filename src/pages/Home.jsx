import { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Footer from "../components/Footer";
import useWeather from "../hooks/useWeather";

// City shown when the user denies location access
const DEFAULT_CITY = "London";

// Full-page gradient backgrounds keyed by weather condition.
// Full class strings are kept here (not built dynamically) so
// Tailwind's compiler can detect and generate them.
const BACKGROUNDS = {
  Clear:
    "from-amber-200 via-sky-300 to-sky-500 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900",
  Clouds:
    "from-slate-200 via-sky-200 to-slate-400 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",
  Rain: "from-slate-400 via-sky-400 to-slate-600 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900",
  Drizzle:
    "from-sky-200 via-slate-300 to-sky-400 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900",
  Thunderstorm:
    "from-slate-500 via-slate-600 to-indigo-700 dark:from-black dark:via-slate-950 dark:to-indigo-950",
  Snow: "from-sky-100 via-slate-100 to-sky-200 dark:from-slate-900 dark:via-slate-800 dark:to-sky-950",
  Mist: "from-slate-200 via-slate-300 to-slate-400 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800",
  default:
    "from-sky-200 via-sky-300 to-blue-400 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950",
};

/** Pick a background gradient for the current weather condition */
const getBackground = (condition) => BACKGROUNDS[condition] || BACKGROUNDS.default;

/**
 * The main (and only) page of the app.
 * Composes all components and owns the "recent searches" feature.
 */
const Home = ({ darkMode, onToggleTheme }) => {
  const {
    weather,
    forecast,
    loading,
    error,
    setError,
    fetchWeather,
    fetchWeatherByCoords,
  } = useWeather();

  // Recent searches, loaded from localStorage once on first render
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recentSearches")) || [];
    } catch {
      return []; // corrupted storage → start fresh
    }
  });

  /** Keep the last 5 unique cities, most recent first */
  const saveRecentSearch = (city) => {
    setRecentSearches((prev) => {
      const updated = [
        city,
        ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase()),
      ].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };

  /** Search handler — only saves the city if the API call succeeded */
  const handleSearch = async (city) => {
    const data = await fetchWeather(city);
    if (data) saveRecentSearch(data.name); // use the API's official city name
  };

  /** Ask the browser for the user's coordinates */
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) =>
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
      () =>
        setError(
          "Location access denied. Please allow location access or search for a city."
        )
    );
  };

  // On first load: try the user's location, fall back to a default city
  useEffect(() => {
    if (!navigator.geolocation) {
      fetchWeather(DEFAULT_CITY);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) =>
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude),
      () => fetchWeather(DEFAULT_CITY)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dependency array → run once on mount

  return (
    <div
      className={`flex min-h-screen flex-col bg-gradient-to-br transition-colors duration-500
        ${getBackground(weather?.weather[0]?.main)}`}
    >
      <Navbar darkMode={darkMode} onToggleTheme={onToggleTheme} />

      <main className="mx-auto flex w-[95%] max-w-5xl flex-1 flex-col items-center gap-6 py-8">
        <SearchBar onSearch={handleSearch} onUseLocation={handleUseLocation} />

        {/* Recent searches — clickable chips */}
        {recentSearches.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <FiClock className="text-slate-600 dark:text-slate-300" />
            {recentSearches.map((city) => (
              <button
                key={city}
                onClick={() => handleSearch(city)}
                className="rounded-full bg-white/50 px-4 py-1.5 text-sm font-medium
                  text-slate-700 shadow-sm backdrop-blur-md transition hover:scale-105
                  hover:bg-white dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {city}
              </button>
            ))}
          </div>
        )}

        {/* Conditional rendering: spinner → error → weather → welcome hint */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Error message={error} />
        ) : weather ? (
          <>
            <WeatherCard weather={weather} />
            <Forecast forecast={forecast} />
          </>
        ) : (
          <p className="py-16 text-center text-slate-600 dark:text-slate-300">
            Search for a city or use your location to see the weather 🌍
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
