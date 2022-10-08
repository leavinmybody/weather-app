import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location:";
      const notify = () => toast.loading("Loading weather data for " + message);
      notify();

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        const notifySuccess = () => toast.success("Data loaded successfully");
        notifySuccess();
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-blue-600 to-sky-600";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-blue-600 to-sky-600";

    return "from-yellow-600 to-orange-600";
  };

  return (
    <div
      className={`max-w-screen-md px-32 py-5 mx-auto mt-4 rounded-md shadow-xl bg-gradient-to-r h-fit shadow-black-400 ${formatBackground()}`}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          loading: {
            duration: 3000,
          },
        }}
      />
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} />

          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
