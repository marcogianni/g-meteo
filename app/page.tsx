import CurrentWeather from "@/components/CurrentWeather";

export default function Home() {
  return (
    <main className="lg:container lg:mx-auto pl-6 pr-6 pt-4">
      <h2 className="text-3xl font-bold tracking-tight">Today</h2>
      <CurrentWeather />
    </main>
  );
}
