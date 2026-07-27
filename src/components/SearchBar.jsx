import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdMyLocation } from "react-icons/md";

/**
 * Search input + "use my location" button.
 *
 * Props:
 *  - onSearch(city)   → called when the user submits a city name
 *  - onUseLocation()  → called when the user clicks the location button
 */
const SearchBar = ({ onSearch, onUseLocation }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading on form submit
    const trimmed = city.trim();
    if (!trimmed) return; // ignore empty searches
    onSearch(trimmed);
    setCity(""); // clear the input after searching
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl items-center gap-2"
    >
      {/* Text input with a search icon inside */}
      <div className="relative flex-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city... e.g. Mumbai, London, Tokyo"
          className="w-full rounded-full border border-white/40 bg-white/60 py-3 pl-11 pr-4
            text-slate-800 placeholder-slate-400 shadow backdrop-blur-md outline-none
            transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300
            dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-100
            dark:placeholder-slate-500 dark:focus:ring-sky-600"
        />
      </div>

      {/* Search button */}
      <button
        type="submit"
        aria-label="Search"
        className="rounded-full bg-sky-500 p-3.5 text-lg text-white shadow
          transition hover:scale-105 hover:bg-sky-600 active:scale-95"
      >
        <FiSearch />
      </button>

      {/* Current-location button */}
      <button
        type="button"
        onClick={onUseLocation}
        aria-label="Use my location"
        title="Use my current location"
        className="rounded-full bg-emerald-500 p-3.5 text-lg text-white shadow
          transition hover:scale-105 hover:bg-emerald-600 active:scale-95"
      >
        <MdMyLocation />
      </button>
    </form>
  );
};

export default SearchBar;
