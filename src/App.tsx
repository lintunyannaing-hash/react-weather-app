import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import Navbar from "./components/Navbar";
import WeatherDetails from "./components/WeatherDetails";
import WeeklyForecast from "./components/WeeklyForecast";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f5f7f8]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <CurrentWeather />
        <HourlyForecast />
        {/* Weekly forecast + Weather details */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

          <div className="lg:col-span-5">
            <WeeklyForecast />
          </div>

          <div className="lg:col-span-7">
            <WeatherDetails />
          </div>
          
        </div>
      </main>
    </div>
  )
}

export default App