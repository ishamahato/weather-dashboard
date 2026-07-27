/**
 * Simple loading spinner shown while weather data is being fetched.
 * The spinner is a circle with a transparent top border + Tailwind's
 * animate-spin utility.
 */
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-sky-500
          border-t-transparent dark:border-sky-300 dark:border-t-transparent"
      />
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Fetching weather data...
      </p>
    </div>
  );
};

export default Loader;
