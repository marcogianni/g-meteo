"use client";

import { CurretWeatherParams, getCurrentWeather } from "@/lib/api/weather";
import useCurrentLanguage from "@/lib/hooks/useCurrentLanguage";
import useGeolocation from "@/lib/hooks/useGeolocation";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import WheaterDisplay from "@/components/WheaterDisplay";

export default function CurrentWeather() {
  const lang = useCurrentLanguage();
  const { latitude, longitude } = useGeolocation();

  const params: CurretWeatherParams = {
    // ! because query is enabled only when latitude and longitude are not null
    latlon: { lat: latitude!, lon: longitude! },
    lang,
  };

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["weather"],
    enabled: latitude != null && longitude != null,
    queryFn: async () => {
      return await getCurrentWeather(params);
    },
  });

  console.debug("CurrentWeather.data", data);

  const normaliseVisibility = (value: number | null) =>
    value == null ? 0 : ((value - 0) * 100) / 10_000;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 mt-6">
        <Card className="bg-accent col-span-4">
          <CardHeader>
            <CardTitle>
              <div className="text-lg">Temperature</div>
            </CardTitle>
            <CardDescription>Current temperature</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-4xl font-bold">{data?.main?.temp}°C</div>
              <div className="pl-2">
                ( {data?.main?.temp_min}°C - {data?.main?.temp_max}°C )
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              <div className="text-lg">Felt Temperature</div>
            </CardTitle>
            <CardDescription>Felt temperature today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-4xl font-bold">
                {data?.main?.feels_like}°C
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-5">
          <WheaterDisplay weather={data?.weather ?? []} />
        </Card>
      </div>
      <div className="mt-6 w-full">
        <Separator />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="text-lg">Humidity</div>
            </CardTitle>
            <CardDescription>Between 0 - 100%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-4xl font-bold">{data?.main?.humidity}%</div>
            </div>
            <Progress className="mt-6" value={data?.main?.humidity} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="text-lg">Clouds</div>
            </CardTitle>
            <CardDescription>Between 0 - 100%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-4xl font-bold">{data?.clouds?.all}%</div>
            </div>
            <Progress className="mt-6" value={data?.clouds?.all} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="text-lg">Visibility</div>
            </CardTitle>
            <CardDescription>Distance in metres</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-4xl font-bold">{data?.visibility}m</div>
            </div>
            <Progress
              className="mt-6"
              value={normaliseVisibility(data?.visibility ?? null)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
