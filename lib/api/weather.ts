import { request } from "./config";

export type LatLon = {
  lat: number;
  lon: number;
};

export type CurretWeatherParams = {
  latlon: LatLon;
  lang: string;
};

export const getCurrentWeather = async (params: CurretWeatherParams) => {
  const { lat, lon } = params.latlon;
  const { lang } = params;

  const [response, error] = await request({
    url: "/weather",
    method: "GET",
    params: {
      lat,
      lon,
      lang,
    },
  });

  return [response, error];
};
