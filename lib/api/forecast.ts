import { request } from "./config";

export interface WeatherParams {
  latlon: { lat: number; lon: number };
  lang: string | null;
}

export const getForecast = async (params: WeatherParams) => {
  const { lat, lon } = params.latlon;
  const { lang } = params;

  const data = await request({
    url: "/forecast",
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
