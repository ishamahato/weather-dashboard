/**
 * Small date/time helper functions used across the app.
 * Keeping them here avoids repeating formatting logic inside components.
 */

/** Format a Date as "Sunday, 27 July 2026" */
export const formatDate = (date) =>
  date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** Format a Date as "05:42 PM" */
export const formatTime = (date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

/** Format a "YYYY-MM-DD" string as a short weekday, e.g. "Mon" */
export const formatDay = (dateString) =>
  new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
  });

/** Format a "YYYY-MM-DD" string as "27 Jul" */
export const formatShortDate = (dateString) =>
  new Date(dateString + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

/**
 * OpenWeatherMap returns each city's timezone as an offset in SECONDS from UTC.
 * This converts "right now" into that city's local time, so searching for
 * Tokyo shows Tokyo's clock — not the visitor's.
 */
export const getCityTime = (timezoneOffsetSeconds) => {
  // Current time in UTC milliseconds
  const utcMs = Date.now() + new Date().getTimezoneOffset() * 60 * 1000;
  // Shift UTC by the city's offset
  return new Date(utcMs + timezoneOffsetSeconds * 1000);
};
