/**
 * Simple footer with credits.
 */
const Footer = () => {
  return (
    <footer className="mt-auto py-6 text-center text-xs text-slate-600 dark:text-slate-400">
      <p>
        Built with React, Vite & Tailwind CSS • Weather data by{" "}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-sky-600 hover:underline dark:text-sky-400"
        >
          OpenWeatherMap
        </a>
      </p>
      <p className="mt-1">© {new Date().getFullYear()} Weather Dashboard</p>
    </footer>
  );
};

export default Footer;
