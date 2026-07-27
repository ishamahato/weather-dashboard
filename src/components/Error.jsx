import { FiAlertTriangle } from "react-icons/fi";

/**
 * Friendly error banner.
 * Shown for invalid cities, network problems and API errors —
 * the message itself is decided inside the useWeather hook.
 */
const Error = ({ message }) => {
  return (
    <div
      role="alert"
      className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-2xl
        border border-red-300/60 bg-red-50/80 p-4 text-red-700 shadow
        backdrop-blur-md dark:border-red-500/40 dark:bg-red-900/30 dark:text-red-300"
    >
      <FiAlertTriangle className="shrink-0 text-2xl" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default Error;
