// @ts-nocheck

import { cn } from "@/lib/utils";
import Lottie from "lottie-react";

type Props = {
  className?: string;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
};

export default function WheaterDisplay(props: Props) {
  const { weather, className = "" } = props;
  if (weather.length === 0) {
    return null;
  }

  return weather.map((single, index) => {
    const icon = single?.icon;

    const availableIcons = Object.keys(wheaterIcons);
    if (!availableIcons.includes(icon)) {
      return null;
    }

    const LottieFile = require(`/public/lotties/${wheaterIcons[icon]}`);

    return (
      <div className={cn("h-28 w-28", className)} key={single?.id}>
        <Lottie animationData={LottieFile} loop={true} />
      </div>
    );
  });
}

const wheaterIcons = {
  "01d": "clear-day.json",
  "01n": "clear-night.json",
  "02d": "partly-cloudy-day.json",
  "02n": "partly-cloudy-night.json",
  "03d": "cloudy.json",
  "03n": "cloudy.json",
  "04d": "overcast.json",
  "04n": "overcast.json",
  "09d": "extreme-day-drizzle.json",
  "09n": "extreme-day-drizzle.json",
  "10d": "partly-cloudy-day-rain.json",
  "10n": "partly-cloudy-night-rain.json",
  "11d": "thunderstorms-day-extreme-rain.json",
  "11n": "thunderstorms-night-extreme-rain.json",
  "13d": "overcast-day-snow.json",
  "13n": "overcast-night-snow.json",
  "50d": "fog.json",
  "50n": "fog.json",
};
