import { GlobeIcon } from "@radix-ui/react-icons";

export default function Logo() {
  return (
    <div className="flex items-center">
      <GlobeIcon className="h-8 w-8" />
      <div className="pl-2 font-extrabold tracking-wider">G-METEO</div>
    </div>
  );
}
