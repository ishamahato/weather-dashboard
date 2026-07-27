# 🌤️ Weather Dashboard

A modern, responsive Weather Dashboard built using **React, Vite, Tailwind CSS, Axios, and OpenWeatherMap API**.

The application allows users to search weather information for any city, detect their current location, view a 5-day weather forecast, and switch between dark and light themes.

---

# 📸 Project Preview

> Add screenshots after completing the project.

## Light Mode

![Light Mode](./screenshots/light-mode.png)

## Dark Mode

![Dark Mode](./screenshots/dark-mode.png)

## Forecast

![Forecast](./screenshots/forecast.png)

---

# ✨ Features

- 🌍 Search weather by city name
- 📍 Detect current location using Geolocation API
- 🌡️ Live weather information
- 🌤 Weather condition icons
- 💧 Humidity
- 🌬 Wind Speed
- 🌡 Feels Like Temperature
- 📊 Atmospheric Pressure
- 👀 Visibility
- 📅 5-Day Weather Forecast
- 🌙 Dark / Light Theme
- 💾 Theme stored using Local Storage
- 🕒 Recent Searches
- ⚡ Fast API requests using Axios
- ⌛ Loading Spinner
- ❌ User-friendly Error Messages
- 📱 Fully Responsive Design
- 🎨 Dynamic Backgrounds based on Weather

---

# 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| React 18 | Frontend UI |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Axios | API Calls |
| React Icons | Icons |
| OpenWeatherMap API | Weather Data |
| JavaScript (ES6+) | Programming Language |
| HTML5 | Structure |
| CSS3 | Styling |

---

# 📂 Project Structure

```
weather-dashboard/
├── public/
├── screenshots/
│   ├── light-mode.png
│   ├── dark-mode.png
│   └── forecast.png
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── WeatherCard.jsx
│   │   ├── WeatherDetails.jsx
│   │   ├── Forecast.jsx
│   │   ├── RecentSearches.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── Loader.jsx
│   │   └── ErrorMessage.jsx
│   ├── hooks/
│   │   └── useWeather.js
│   ├── services/
│   │   └── weatherService.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

# ⚙️ Prerequisites

Install the following software before running the project.

- Node.js (v18 or above)
- npm
- Git
- VS Code (Recommended)

---

# 🚀 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/isha-mahato/weather-dashboard.git
```

---

## 2️⃣ Go Inside Project

```bash
cd weather-dashboard
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔑 OpenWeatherMap API Setup

Create an account:

https://openweathermap.org/

Login and generate your API Key.

Create a file named `.env` in the project root.

Add your API key:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

Example:

```env
VITE_WEATHER_API_KEY=ab12cd34ef56gh78ij90kl12mn34op56
```

⚠ Restart the development server after updating the API key.

---

# ▶ Run the Project

## Windows

Open Command Prompt or PowerShell inside the project folder.

```bash
npm run dev
```

Open the browser at:

```
http://localhost:5173
```

---

## macOS

Open Terminal.

Install packages:

```bash
npm install
```

Run project:

```bash
npm run dev
```

Open the browser at:

```
http://localhost:5173
```

---

# 📦 Production Build

Create Production Build:

```bash
npm run build
```

Preview Production Build:

```bash
npm run preview
```

## Deploy

1. Login to Vercel — https://vercel.com

2. Click **Add New → Project**

3. Import GitHub Repository

4. Add Environment Variable

   | Name | Value |
   |------|-------|
   | `VITE_WEATHER_API_KEY` | your API key |

5. Click **Deploy**

---

# 📖 How the Project Works

### Search City

User enters city name.

↓

React calls `useWeather()` custom hook

↓

Axios sends request via `weatherService.js`

↓

OpenWeatherMap API

↓

Weather data returned

↓

Displayed using `WeatherCard` and `Forecast` components

---

### Current Location

Browser

↓

Geolocation API

↓

Latitude & Longitude

↓

OpenWeatherMap API

↓

Weather Displayed

---

### Dark Mode

User clicks Theme Button

↓

React State changes

↓

Dark class added to HTML

↓

Tailwind CSS changes theme

↓

Theme stored in Local Storage

---

# 📚 Future Improvements

- Air Pollution API
- Weather Maps
- Sunrise & Sunset
- Hourly Forecast
- Weather Charts
- Voice Search
- Multi-language Support
- PWA Support
- Offline Mode

---

# 🐞 Error Handling

- Invalid City
- Invalid API Key
- Internet Connection Error
- API Limit Exceeded
- Location Permission Denied

---

# 📜 Environment Variables

Create a `.env` file in the project root.

Example:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

Never upload `.env` to GitHub.

Add it to `.gitignore`:

```
.env
```

---



# 👩‍💻 Author

**Isha Mahato**

[GitHub](https://github.com/isha-mahato)

[LinkedIn](https://www.linkedin.com/in/isha-mahato)
