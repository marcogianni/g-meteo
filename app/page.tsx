import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";

export default function Home() {
  return (
    <main className="lg:container lg:mx-auto pl-6 pr-6 pt-6 relative z-10">
      <CurrentWeather />
      <Forecast />
    </main>
  );
}
