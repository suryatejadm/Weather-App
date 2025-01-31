import React, { useState } from "react";
import axios from "axios";
import { create } from "zustand";

// Zustand Store
const useWeatherStore = create((set) => ({
  weather: null,
  fetchWeather: async (city) => {
    const API_KEY = "your_api_key"; // Replace with your OpenWeather API key
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    set({ weather: res.data });
  },
}));

export default function App() {
  const { weather, fetchWeather } = useWeatherStore();
  const [city, setCity] = useState("");

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4">Weather App</h1>
      <input
        className="border p-2 w-full"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button
        className="mt-2 bg-blue-500 text-white p-2 rounded"
        onClick={() => fetchWeather(city)}
      >
        Get Weather
      </button>
      {weather && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temp: {Math.round(weather.main.temp - 273.15)}°C</p>
        </div>
      )}
    </div>
  );
}
