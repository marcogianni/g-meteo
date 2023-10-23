// @ts-nocheck

import Lottie from "lottie-react";

// TODO FIND WAY TO IMPORT DYNAMICALLY
import ClearDay from "/public/lotties/clear-day.json";
import ClearNight from "/public/lotties/clear-night.json";
import PartlyCloudDay from "/public/lotties/partly-cloudy-day.json";
import PartlyCloudNight from "/public/lotties/partly-cloudy-night.json";
import Cloudy from "/public/lotties/cloudy.json";
import Overcast from "/public/lotties/overcast.json";
import ExtremeDayDrizzle from "/public/lotties/extreme-day-drizzle.json";
import ExtremeNightDrizzle from "/public/lotties/extreme-night-drizzle.json";
import PartlyCloudDayRain from "/public/lotties/partly-cloudy-day-rain.json";
import PartlyCloudNightRain from "/public/lotties/partly-cloudy-night-rain.json";
import ThunderstormsDayExtremeRain from "/public/lotties/thunderstorms-day-extreme-rain.json";
import ThunderstormsNightExtremeRain from "/public/lotties/thunderstorms-night-extreme-rain.json";
import OvercastDaySnow from "/public/lotties/overcast-day-snow.json";
import OvercastNightSnow from "/public/lotties/overcast-night-snow.json";
import Fog from "/public/lotties/fog.json";

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
        const File = wheaterIcons2?.[single?.icon];

        return (
          <div
            className="flex flex-col p-4 items-center content-center"
            key={single?.id}
          >
            <div className="h-28 w-28">
              <Lottie animationData={File} loop={true} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const wheaterIcons2 = {
  "01d": ClearDay,
  "01n": ClearNight,
  "02d": PartlyCloudDay,
  "02n": PartlyCloudNight,
  "03d": Cloudy,
  "03n": Cloudy,
  "04d": Overcast,
  "04n": Overcast,
  "09d": ExtremeDayDrizzle,
  "09n": ExtremeNightDrizzle,
  "10d": PartlyCloudDayRain,
  "10n": PartlyCloudNightRain,
  "11d": ThunderstormsDayExtremeRain,
  "11n": ThunderstormsNightExtremeRain,
  "13d": OvercastDaySnow,
  "13n": OvercastNightSnow,
  "50d": Fog,
  "50n": Fog,
};

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
