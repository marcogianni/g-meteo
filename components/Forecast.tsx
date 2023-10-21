"use client";

import { useQuery } from "@tanstack/react-query";

import { getForecast } from "@/lib/api/forecast";
import { WeatherParams } from "@/lib/api/weather";
import useCurrentLanguage from "@/lib/hooks/useCurrentLanguage";
import useGeolocation from "@/lib/hooks/useGeolocation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  console.debug("Forecast.data", data);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold tracking-tight">Forecast</h2>
      <Tabs defaultValue="today" className="mt-4">
        <TabsList className="grid w-full grid-cols-5 h-[auto]">
          <TabsTrigger value="today">
            <div className="flex items-center content-center h-20">Today</div>
          </TabsTrigger>
          <TabsTrigger value="1">
            <div className="flex items-center content-center h-20">Today</div>
          </TabsTrigger>
          <TabsTrigger value="2">
            <div className="flex items-center content-center h-20">Today</div>
          </TabsTrigger>
          <TabsTrigger value="3">
            <div className="flex items-center content-center h-20">Today</div>
          </TabsTrigger>
          <TabsTrigger value="4">
            <div className="flex items-center content-center h-20">Today</div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="today"></TabsContent>
        <TabsContent value="1"></TabsContent>
        <TabsContent value="2"></TabsContent>
        <TabsContent value="3"></TabsContent>
        <TabsContent value="4"></TabsContent>
      </Tabs>
    </div>
  );
}
