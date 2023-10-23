import { request } from "./config";

export interface WeatherParams {
  latlon: { lat: number; lon: number };
  lang: string | null;
}

export interface CurrentWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export const getCurrentWeather = async (params: WeatherParams) => {
  const { lat, lon } = params.latlon;
  const { lang } = params;

  const data: CurrentWeather = await request({
    url: "/data/2.5/weather",
    method: "GET",
    params: {
      lat,
      lon,
      lang,
      units: "metric",
    },
  });

  return data;
};
