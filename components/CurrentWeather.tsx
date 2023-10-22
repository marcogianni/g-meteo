"use client";

import { useQuery } from "@tanstack/react-query";

import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import WheaterDisplay from "@/components/WheaterDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GeolocationIndicator from "@/components/GeolocationIndicator";

import { WeatherParams, getCurrentWeather } from "@/lib/api/weather";
import useCurrentLanguage from "@/lib/hooks/useCurrentLanguage";
import useGeolocation from "@/lib/hooks/useGeolocation";

export default function CurrentWeather() {
  const lang = useCurrentLanguage();
  const { latitude, longitude, loading, error: err } = useGeolocation();
  console.debug("useGeolocation", { latitude, longitude, loading, err });

  const params: WeatherParams = {
    latlon: { lat: latitude!, lon: longitude! },
    lang,
  };

  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["weather", latitude, longitude],
    enabled: latitude != null && longitude != null,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return await getCurrentWeather(params);
    },
  });

  const normaliseVisibility = (value: number | null) =>
    value == null ? 0 : ((value - 0) * 100) / 10_000;

  if (isLoading || isFetching || data == undefined) {
    return (
      <>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Today</h2>
          <GeolocationIndicator
            loading={loading}
            city={data?.name}
            country={data?.sys?.country}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 mt-6">
          <Card className="col-span-5">
            <CardHeader>
              <CardTitle>
                <div className="text-lg">Temperature</div>
              </CardTitle>
              <CardDescription>Current temperature</CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[40px] bg-current opacity-20" />
            </CardContent>
          </Card>
          <Card className="col-span-4"></Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>
                <div className="text-lg">Felt Temperature</div>
              </CardTitle>
              <CardDescription>Felt temperature today</CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[40px] bg-current opacity-20" />
            </CardContent>
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
              <Skeleton className="h-[72px] bg-current opacity-20" />
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
              <Skeleton className="h-[72px] bg-current opacity-20" />
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
              <Skeleton className="h-[72px] bg-current opacity-20" />
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Today</h2>
        <GeolocationIndicator
          loading={loading}
          city={data?.name}
          country={data?.sys?.country}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 mt-6">
        <Card className="col-span-5">
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
        <Card className="col-span-4">
          <WheaterDisplay weather={data?.weather ?? []} />
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
            <div>
              <div className="flex items-baseline">
                <div className="text-4xl font-bold">
                  {data?.main?.humidity}%
                </div>
              </div>
              <Progress className="mt-6" value={data?.main?.humidity} />
            </div>
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
            <div>
              <div className="flex items-baseline">
                <div className="text-4xl font-bold">{data?.clouds?.all}%</div>
              </div>
              <Progress className="mt-6" value={data?.clouds?.all} />
            </div>
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
