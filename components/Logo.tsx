"use client";

import { GlobeIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function Logo() {
  const { theme } = useTheme();

  return (
    <div className="flex items-center">
      <GlobeIcon className="h-8 w-8" />
      <div className="pl-2 font-extrabold tracking-wider">G-METEO</div>
    </div>
  );
}
