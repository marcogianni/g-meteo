"use client";

import { ZoomInIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";

import { Geo, getGeo } from "@/lib/api/geo";
import useCurrentLanguage from "@/lib/hooks/useCurrentLanguage";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchLocation() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [results, setResults] = useState<Geo[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const paramLat = searchParams.get("lat");

  const lang = useCurrentLanguage();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    try {
      const data: Geo[] = await getGeo(value);
      setResults(data);
    } catch (err) {
      console.debug("Error", err);
    }
  };

  const debounceQuery = debounce(handleSearch, 500);

  const handleClick = (location: Geo) => {
    router.push(`/?lat=${location?.lat}&lon=${location?.lon}&lang=${lang}`);
    setDialogOpen(false);
    setResults([]);
  };

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
            <div className="flex items-center gap-2">
              {results.map((single) => (
                <Badge
                  className="cursor-pointer"
                  key={single?.name}
                  onClick={() => handleClick(single)}
                >
                  {single?.name}
                </Badge>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Button onClick={() => setDialogOpen(true)}>
        <ZoomInIcon className="h-6 w-6 text-white" />
        <span className="pl-2">Search</span>
      </Button>
      {paramLat !== null && (
        <Button color="secondary" onClick={() => router.push("/")}>
          Back to my City
        </Button>
      )}
    </>
  );
}
