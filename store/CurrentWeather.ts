import { create } from "zustand";

export const useCurrentWeatherStore = create((set) => ({
  currentWeather: null,
  // setCurrentWeather: () => set({ currentWeather }),
  // loadCurrentWeather: async (lat: number, lon: number) => {
  //   const response = await fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
  //   );
  //   const json = await response.json();
  //   set({ currentWeather: json });
  // },
}));
