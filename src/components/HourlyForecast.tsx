import {
    Sun,
    CloudSun,
    Moon,
    Droplets,
    ArrowLeft,
    ArrowRight,
    type LucideIcon
} from "lucide-react";
import { useRef } from "react";

// Define the structure of each forecast item
interface HourlyForecastItem{
    time: string;
    temperature: number;
    rainChance: number;
    windSpeed: number;
    icon: LucideIcon;
};

// --------------- Temporary static weather datas ----------------
const hourlyData: HourlyForecastItem[] = [
    { time: 'Now', temperature: 18, rainChance: 0, windSpeed: 14, icon: CloudSun },
    { time: '11 AM', temperature: 19, rainChance: 10, windSpeed: 14, icon: CloudSun },
    { time: '12 PM', temperature: 20, rainChance: 5, windSpeed: 10, icon: Sun },
    { time: '1 PM', temperature: 21, rainChance: 5, windSpeed: 8, icon: Sun },
    { time: '2 PM', temperature: 21, rainChance: 5, windSpeed: 12, icon: Sun },
    { time: '3 PM', temperature: 20, rainChance: 10, windSpeed: 21, icon: CloudSun },
    { time: '4 PM', temperature: 20, rainChance: 10, windSpeed: 20, icon: CloudSun },
    { time: '5 PM', temperature: 19, rainChance: 10, windSpeed: 18, icon: Sun },
    { time: '6 PM', temperature: 18, rainChance: 10, windSpeed: 16, icon: CloudSun },
    { time: '7 PM', temperature: 17, rainChance: 10, windSpeed: 14, icon: Moon },
];

const HourlyForecast = () => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll forecast items left or right
    const handleScroll = (direction: 'left' | 'right') => {
        
        if(!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;

        const scrollAmount = container.clientWidth * 0.8;

        container.scrollBy({
            left: direction === 'right'
                ? scrollAmount
                : -scrollAmount,
                behavior: 'smooth'
        });
    };

  return (
    <section className="space-y-3">

        {/* Section Heading */}
        <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-[#294454]">
                The day ahead
            </h2>

            <div className="flex items-center gap-3">
                <p className="flex items-center gap-1 text-slate-400 text-[10px]">
                    Hourly forecast . Next 24 hours
                </p>
                {/* Navigation Buttons */}
                <div className="hidden sm:flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => handleScroll('left')}
                        aria-label="Previous hourly forecast"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200
                            text-slate-500 transition hover:bg-slate-100 hover:text-[#294454] active:scale-95"
                    >
                        <ArrowLeft size={14} />
                    </button>

                    <button
                        type="button"
                        onClick={() => handleScroll('right')}
                        aria-label="Next hourly forecast"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 
                            text-slate-500 transition hover:bg-slate-100 hover:text-[#294454] active:scale-95"
                    >
                            <ArrowRight size={14} />
                        </button>
                </div>
            </div>
        </div>

        {/* Forecast Cards Container */}
        {/* ------------ Ref Container -------- */}
        <div
            ref={scrollContainerRef}
            className="overflow-x-auto rounded-xl bg-white p-2 scroll-smooth snap-x snap-mandatory
                [scrollbar-width:thin]
                [&::-webkit-scrollbar]:h-1
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-slate-300"
        >
            
            <div className="grid grid-flow-col auto-cols-[76px] sm:auto-cols-[84px] gap-1
                xl:grid-flow-row xl:grid-cols-10 xl:auto-cols-auto">

                {hourlyData.map((hour, index) => {
                    const WeatherIcon = hour.icon;

                    return(
                        <div
                            key={hour.time}
                            className={`flex snap-start flex-col items-center gap-2 rounded-lg px-1 py-3 text-center ${
                                index === 0
                                    ? 'bg-[#eaf3f7]'
                                    : 'bg-white'
                                }`}
                        >
                            {/* Time */}
                            <span className="text-[9px] text-slate-500">
                                {hour.time}
                            </span>

                            {/* Weather icon */}
                            <WeatherIcon
                                size={16}
                                strokeWidth={1.5}
                                className="text-amber-500"
                            />

                            {/* Temperature */}
                            <span className="text-base font-medium text-[#294454]">
                                {hour.temperature}°
                            </span>

                            {/* Rain Probability */}
                            <div className="flex items-center gap-1">
                                <Droplets size={12} />
                                <span className="text-xs text-slate-400">{hour.rainChance}%</span>
                            </div>

                            {/* Wind Speed */}
                            <span className="text-[8px] text-slate-400">
                                {hour.windSpeed} km/h
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  )
}

export default HourlyForecast