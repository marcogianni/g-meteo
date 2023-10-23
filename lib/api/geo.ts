import { request } from "./config";

export type Geo = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export const getGeo = async (query: string) => {
  const data: Geo[] = await request({
    url: "/geo/1.0/direct",
    method: "GET",
    params: {
      q: query,
    },
  });

  return data;
};
