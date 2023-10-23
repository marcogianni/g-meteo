"use client";

import { ZoomInIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function SearchLocation() {
  const handleSearch = () => {
    console.log("search");
  };

  return (
    <div className="flex items-center relative">
      <Dialog>
        <DialogTrigger>
          <Button>
            <ZoomInIcon className="h-6 w-6 text-white" />
            <span className="pl-2">Search Location</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg">Search Location</DialogTitle>
            <DialogDescription>
              Search by City name, state code (only for the US) and country code
              divided by comma. Please use ISO 3166 country codes.
            </DialogDescription>
          </DialogHeader>
          <Input placeholder="Search Location" onChange={handleSearch} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
