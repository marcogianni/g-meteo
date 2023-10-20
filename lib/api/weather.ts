import { request } from "./config";

export interface CurretWeatherParams {
  latlon: { lat: number; lon: number };
  lang: string | null;
}

export const getCurrentWeather = async (params: CurretWeatherParams) => {
  const { lat, lon } = params.latlon;
  const { lang } = params;

  return await request({
    url: "/weather",
    method: "GET",
    params: {
      lat,
      lon,
      lang,
    },
  });
};
