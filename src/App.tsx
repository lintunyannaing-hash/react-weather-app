import CurrentWeather from "./components/CurrentWeather";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f5f7f8]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <CurrentWeather />
      </main>
    </div>
  )
}

export default App