import axios from "axios";

const BASE_URL = "https://api.openweathermap.org";

type RequestParams = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  params?: any;
  body?: any;
  headers?: any;
};

export const request = async (params: RequestParams) => {
  const { url, method, params: urlParams, body, headers } = params;

  const requestOptions = {
    url: `${BASE_URL}${url}`,
    method,
    params: {
      ...urlParams,
      appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
    },
    data: body,
    headers,
  };

  const response = await axios(requestOptions);
  console.log(`%cAPI: ${method} ${url}`, `color: #21d97d;font-size: 11px`, {
    url: url,
    params,
    body: body,
    response: response,
  });

  return response.data;
};
