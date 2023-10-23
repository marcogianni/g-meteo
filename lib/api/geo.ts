import { request } from "./config";

export const getGeo = async (query: string) => {
  const data = await request({
    url: "/geo/1.0/direct",
    method: "GET",
    params: {
      q: query,
    },
  });

  return data;
};
