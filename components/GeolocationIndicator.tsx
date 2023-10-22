import { DrawingPinFilledIcon, ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  loading: boolean;
  city: string | null | undefined;
  country: string | null | undefined;
};

export default function GeolocationIndicator(props: Props) {
  const { loading, city, country } = props;

  if (loading) {
    return (
      <span className="text-md font-semibold bg-primary p-1 pl-4 pr-4 rounded-full flex items-center gap-2 text-white">
        <ReloadIcon className="animate-spin" />
        Loading Geolocation
      </span>
    );
  }

  if (country && city) {
    return (
      <span className="text-md font-semibold bg-primary p-1 pl-4 pr-4 rounded-full flex items-center gap-2 text-white">
        <DrawingPinFilledIcon />
        {city}, {country}
      </span>
    );
  }
}
