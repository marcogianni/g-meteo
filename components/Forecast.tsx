"use client";

import { toPairs } from "ramda";
import { useQuery } from "@tanstack/react-query";

import { Table, TableBody } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForecastRow from "@/components/ForecastRow";

import { getForecast } from "@/lib/api/forecast";
import { WeatherParams } from "@/lib/api/weather";
import useCurrentLanguage from "@/lib/hooks/useCurrentLanguage";
import useGeolocation from "@/lib/hooks/useGeolocation";

import { days } from "@/lib/utils";

export default function Forecast() {
  const lang = useCurrentLanguage();
  const { latitude, longitude } = useGeolocation();

  const params: WeatherParams = {
    // ! because query is enabled only when latitude and longitude are not null
    latlon: { lat: latitude!, lon: longitude! },
    lang,
  };

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["forecast", latitude, longitude],
    enabled: latitude != null && longitude != null,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return await getForecast(params);
    },
  });

  const forecastData = data?.list;

  // group by the same day
  const groupedForecastByDay = forecastData?.reduce(
    (acc: { [key: string]: any[] }, item: any) => {
      const date = item.dt_txt.split(" ")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="mt-8 mb-8">
      <h2 className="text-3xl font-bold tracking-tight">Forecast</h2>
      <Tabs defaultValue="Today" className="mt-4">
        <TabsList className="grid w-full grid-cols-6 h-[auto]">
          {groupedForecastByDay != undefined &&
            toPairs(groupedForecastByDay).map((item: any, index) => {
              const d = new Date(item[0]);
              const dayName = days[d.getDay()];
              const value = index === 0 ? "Today" : index.toString();

              return (
                <TabsTrigger key={item[0]} value={value}>
                  <div className="flex items-center content-center h-20">
                    <div className="text-md">
                      {index === 0 ? "Today" : dayName}
                    </div>
                  </div>
                </TabsTrigger>
              );
            })}
        </TabsList>

        {groupedForecastByDay != undefined &&
          toPairs(groupedForecastByDay).map((item: any, index) => {
            const value = index === 0 ? "Today" : index.toString();

            return (
              <TabsContent key={item[0]} value={value}>
                <Table>
                  <TableBody>
                    {item[1].map((item: any) => (
                      <ForecastRow key={item?.dt_txt} weatherItem={item} />
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            );
          })}
      </Tabs>
    </div>
  );
}
