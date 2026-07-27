import { FiSun, FiMoon } from "react-icons/fi";
import { TiWeatherPartlySunny } from "react-icons/ti";

/**
 * Top navigation bar: app logo/title on the left,
 * dark/light theme toggle button on the right.
 */
const Navbar = ({ darkMode, onToggleTheme }) => {
  return (
    <nav className="glass-card mx-auto mt-4 flex w-[95%] max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      {/* Logo + title */}
      <div className="flex items-center gap-2">
        <TiWeatherPartlySunny className="text-3xl text-amber-500 dark:text-amber-300" />
        <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100 sm:text-xl">
          Weather Dashboard
        </h1>
      </div>

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        aria-label="Toggle dark mode"
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className="rounded-full bg-white/60 p-2.5 text-xl text-slate-700 shadow transition
          hover:scale-110 hover:bg-white dark:bg-slate-700/60 dark:text-amber-300 dark:hover:bg-slate-700"
      >
        {darkMode ? <FiSun /> : <FiMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
