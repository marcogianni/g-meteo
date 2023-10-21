import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState, useEffect, useRef } from "react";

export type GeolocationState = {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: string | null;
};

export default function useGeolocation(
  options: PositionOptions = {
    enableHighAccuracy: false,
    // timeout: 10000,
    maximumAge: Infinity,
  }
): GeolocationState {
  const { toast } = useToast();
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  const optionsRef = useRef(options);

  useEffect(() => {
    const onEvent = ({ coords, timestamp }: GeolocationPosition) => {
      if (state.loading) {
        setState({
          loading: false,
          timestamp,
          latitude: coords.latitude,
          longitude: coords.longitude,
          altitude: coords.altitude,
          accuracy: coords.accuracy,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          speed: coords.speed,
          error: null,
        });
      }
    };

    const onEventError = (error: GeolocationPositionError) => {
      setState((s) => ({
        ...s,
        loading: false,
        error: error.message,
      }));
      toast({
        title: "Action required",
        description: error?.message,
        variant: "destructive",
      });
    };

    const navigatorGeolocation = navigator.geolocation as Geolocation;

    navigatorGeolocation.getCurrentPosition(
      onEvent,
      onEventError,
      optionsRef.current
    );
  }, []);

  return state;
}
