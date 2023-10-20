// @ts-nocheck

import dynamic from "next/dynamic";
import { ReactNode } from "react";

type Props = {
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
};

export default function WheaterDisplay(props: Props) {
  const { weather } = props;
  if (weather.length === 0) {
    return null;
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      {weather.map((single, index) => {
        const icon = single?.icon;

        const availableIcons = Object.keys(wheaterIcons);
        if (!availableIcons.includes(icon)) {
          return null;
        }
        const name: string = wheaterIcons?.[single?.icon];
        if (!name) {
          return null;
        }
        const SvgIcon: ReactNode = dynamic(
          () => import(`/public/icons/${name}`, { ssr: true })
        );
        return (
          <div
            className="flex flex-col p-4 items-center content-center"
            key={single?.id}
          >
            <div className="h-24 w-24">
              <SvgIcon key={index} className="fill-current" />
            </div>
            <div className="text-center capitalize">{single?.description}</div>
          </div>
        );
      })}
    </div>
  );
}

const wheaterIcons = {
  "01d": "wi-day-sunny.svg",
  "01n": "wi-night-clear.svg",
  "02d": "wi-day-cloudy.svg",
  "02n": "wi-night-alt-cloudy.svg",
  "03d": "wi-cloud.svg",
  "03n": "wi-cloud.svg",
  "04d": "wi-cloudy.svg",
  "04n": "wi-cloudy.svg",
  "09d": "wi-day-showers.svg",
  "09n": "wi-night-alt-showers.svg",
  "10d": "wi-day-rain.svg",
  "10n": "wi-night-alt-rain.svg",
  "11d": "wi-day-thunderstorm.svg",
  "11n": "wi-night-alt-thunderstorm.svg",
  "13d": "wi-day-snow.svg",
  "13n": "wi-night-alt-snow.svg",
  "50d": "wi-day-fog.svg",
  "50n": "wi-night-fog.svg",
};
