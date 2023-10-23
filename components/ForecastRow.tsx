import { TableCell, TableRow } from "@/components/ui/table";
import WheaterDisplay from "@/components/WheaterDisplay";
import { ArrowUpIcon } from "@radix-ui/react-icons";

type Props = {
  weatherItem: any;
};

export default function ForecastRow(props: Props) {
  const { weatherItem } = props;

  const dateHours = new Date(weatherItem?.dt_txt).getHours();
  const dateMinutes = new Date(weatherItem?.dt_txt).getMinutes() + "0";

  const date = `${dateHours}:${dateMinutes}`;

  return (
    <TableRow
      key={weatherItem?.dt_txt}
      className="flex justify-around items-center"
    >
      <TableCell className="font-medium">
        <div className="h-20 flex items-center text-lg tabular-nums w-20 justify-center">
          {date}
        </div>
      </TableCell>
      <TableCell className="font-medium">
        <div className="h-20 flex items-center">
          <WheaterDisplay
            className="h-20 w-20"
            weather={weatherItem?.weather ?? []}
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">
        <div className="h-20 flex items-center">
          <div className="flex items-baseline">
            <div className="text-xl font-bold tabular-nums">
              {weatherItem?.main?.temp}°C
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium">
        <div className="h-12 flex items-center">
          <div className="h-20 flex items-center">
            <div className="flex items-baseline">
              <div className="text-xl font-bold tabular-nums">
                {weatherItem?.clouds?.all}%
              </div>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium">
        <div className="h-12 flex items-center">
          <div className="h-20 flex items-center">
            <div className="flex items-center">
              <div className="text-xl font-bold tabular-nums">
                {weatherItem?.wind?.speed} km/h
              </div>
              <div className="ml-4">
                <ArrowUpIcon
                  className="h-6 w-6"
                  style={{
                    transform: `rotate(${weatherItem?.wind?.deg}deg)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
