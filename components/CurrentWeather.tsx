"use client";

import { CurretWeatherParams, getCurrentWeather } from "@/lib/api/weather";
import useCurrentLanguage from "@/lib/hooks/useCurrentLanguage";
import useGeolocation from "@/lib/hooks/useGeolocation";
import { useQuery } from "@tanstack/react-query";

export default function CurrentWeather() {
  const lang = useCurrentLanguage();
  const { latitude, longitude } = useGeolocation();

  const params: CurretWeatherParams = {
    // ! because query is enabled only when latitude and longitude are not null
    latlon: { lat: latitude!, lon: longitude! },
    lang,
  };

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["weather", params],
    enabled: latitude != null && longitude != null,
    queryFn: async () => {
      return await getCurrentWeather(params);
    },
  });

  console.debug({
    lang,
    latitude,
    longitude,
    isLoading,
    isError,
    data,
    error,
    refetch,
    isFetching,
  });

  return (
    <div>
      <div>current weather</div>
    </div>
  );
}
