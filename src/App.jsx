import { useState, useEffect } from "react";
import Home from "./pages/Home";

/**
 * Root component.
 * Its only job is managing the dark/light theme —
 * everything else lives inside the Home page.
 */
const App = () => {
  // Lazy initializer: read the saved theme from localStorage once, on first render.
  // Falls back to the user's operating-system preference.
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Whenever the theme changes: toggle the "dark" class on <html>
  // (which Tailwind's dark: variants react to) and persist the choice.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Home
      darkMode={darkMode}
      onToggleTheme={() => setDarkMode((prev) => !prev)}
    />
  );
};

export default App;
