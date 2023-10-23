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
import { debounce } from "@/lib/utils";

import { getGeo } from "@/lib/api/geo";
import useCurrentLanguage from "@/lib/hooks/useCurrentLanguage";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchLocation() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramLat = searchParams.get("lat");

  const lang = useCurrentLanguage();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const data = await getGeo(value);
    const lat = data[0].lat;
    const lon = data[0].lon;

    if (lat == null || lon == null) {
      return null;
    }

    setDialogOpen(false);
    router.push(`/?lat=${lat}&lon=${lon}&lang=${lang}`);
  };

  const debounceQuery = debounce(handleSearch, 500);

  return (
    <>
      <div className="flex items-center relative">
        <Dialog open={dialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg">Search Location</DialogTitle>
              <DialogDescription>
                Search by City name, state code (only for the US) and country
                code divided by comma. Please use ISO 3166 country codes.
              </DialogDescription>
            </DialogHeader>
            <Input placeholder="Search Location" onChange={debounceQuery} />
          </DialogContent>
        </Dialog>
      </div>
      <Button onClick={() => setDialogOpen(true)}>
        <ZoomInIcon className="h-6 w-6 text-white" />
        <span className="pl-2">Search Location</span>
      </Button>
      {paramLat !== null && (
        <Button color="secondary" onClick={() => router.push("/")}>
          Back to my City
        </Button>
      )}
    </>
  );
}
