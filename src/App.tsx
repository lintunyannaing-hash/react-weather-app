import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import Navbar from "./components/Navbar";
import WeeklyForecast from "./components/WeeklyForecast";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f5f7f8]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <CurrentWeather />
        <HourlyForecast />
        <div className="flex items-center justify-between sm:flex-col md:flex-col max-w-[1440px]">
          <div className="max-w-[700px] sm:w-full ml-0.5"></div>
          <WeeklyForecast />
        </div>
      </main>
    </div>
  )
}

export default App