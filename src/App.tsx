
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import HourlyForecast from "./components/HourlyForecast";
import Navbar from "./components/Navbar";
import WeatherDetails from "./components/WeatherDetails";
import WeeklyForecast from "./components/WeeklyForecast";

import { useWeather } from "./hooks/useWeather";
import { useAirQuality } from "./hooks/useAirQuality";

// Default location for San Franciso
const DEFAULT_LATITUDE = 37.7749;
const DEFAULT_LONGITUDE = -122.4149;

const App = () => {

  // Weather State
  const { data, isLoading, error } = useWeather();

  // Air quality state
  const {
      data: airQualityData,
      isLoading: isAirQualityLoading,
      error: airQualityError,
  } = useAirQuality(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);


  return (
    <div className="min-h-screen bg-[#f5f7f8]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        
        {isLoading && (
          <p className="py-10 text-center text-sm text-slate-500">
            Loading weather data...
          </p>
        )}

        {error && (
          <p role="alert" className="'py-10 text-center text-sm text-red-600">
            Unable to load weather data: {error}
          </p>
        )}

        {data && <CurrentWeather weather={data} />}

        {data && <HourlyForecast weather={data}/>}
        {/* Weekly forecast + Weather details */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

          <div className="lg:col-span-5">
            {data && <WeeklyForecast weather={data}/>}
          </div>

          <div className="lg:col-span-7">
            {data && <WeatherDetails weather={data} airQuality={airQualityData}/>}
          </div>
          
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[10px] text-slate-500 font-medium">
            Weather for the way you live. Forecast data from OpenWeather.
          </p>

          <p className="text-[10px] text-slate-500 font-medium">
            All time in PDT . Updated at 10:42 AM
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App