"use client";

import { Input } from "@/components/ui/input";
import { ZoomInIcon } from "@radix-ui/react-icons";

export function SearchLocation() {
  const handleClickSearch = () => {
    console.log("search");
  };

  return (
    <div
      className="w-[140px] flex items-center relative"
      onClick={handleClickSearch}
    >
      <ZoomInIcon className="absolute left-4 h-6 w-6 text-white" />
      <Input
        placeholder="Search..."
        className="pl-12 pt-2 pb-2 text-md bg-primary white cursor-pointer placeholder:text-white border-primary"
      />
    </div>
  );
}
