import {
    Sun,
    CloudSun,
    Cloud,
    CloudFog,
    CloudDrizzle,
    CloudRain,
    Snowflake,
    CloudRainWind,
    CloudSnow,
    CloudLightning,
    Droplets,
    ArrowLeft,
    ArrowRight,
    type LucideIcon
} from "lucide-react";

import { useRef } from "react";
// type from weather.ts
import type { WeatherResponse } from "../types/weather";

// Define the components's props
interface HourlyForecastProps{
    weather: WeatherResponse;
};

// Convert Open-Meteo weather codes into relatable Weather Icons
const getWeatherIcon = (code: number): LucideIcon => {
    if (code === 0) return Sun;
    if (code === 1) return Sun;
    if (code === 2) return CloudSun;
    if (code === 3) return Cloud;

    if (code >= 45 && code <= 48) return CloudFog;
    if (code >= 51 && code <= 57) return CloudDrizzle;
    if (code >= 61 && code <= 67) return CloudRain;
    if (code >= 71 && code <= 77) return Snowflake;
    if (code >= 80 && code <= 82) return CloudRainWind;
    if (code >= 85 && code <= 86) return CloudSnow;
    if (code >= 95) return CloudLightning;

    return Cloud;
}
// Color design for each one
const getWeatherColor = (code: number): string => {
    if (code === 0) return "text-yellow-500";
    if (code === 1) return "text-amber-400";
    if (code === 2) return "text-orange-400";
    if (code === 3) return "text-slate-400";

    if (code >= 45 && code <= 48) return "text-gray-400";
    if (code >= 51 && code <= 57) return "text-sky-400";
    if (code >= 61 && code <= 67) return "text-blue-500";
    if (code >= 71 && code <= 77) return "text-cyan-400";
    if (code >= 80 && code <= 82) return "text-blue-600";
    if (code >= 85 && code <= 86) return "text-cyan-500";
    if (code >= 95) return "text-purple-500";

    return "text-slate-400";
};

const HourlyForecast = ({weather}: HourlyForecastProps) => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Find the hourly forecast entry matching the current time
    // slice method ==> used to get the exact time that match with actual hourly time data
    // 12:43 => 12
    const currentHourIndex = weather.hourly.time.findIndex(
        (time) => time.slice(0, 13) === weather.current.time.slice(0, 13)
    );

    // Check exact item is exist or not that match with current time
    if(currentHourIndex !== -1){
        console.log("Currently hourly forecast index:", currentHourIndex);
    } else {
        console.log("No matching hourly forecast found!");
    }

    // If no exact match is found, start from the first avaliable entry
    const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;

    // Get the next 24 hourly forecast entries
    const hourlyData = weather.hourly.time
        .slice(startIndex, startIndex + 24)
        .map((time, index) => ({
            time,
            icon: getWeatherIcon(weather.hourly.weather_code[startIndex + index]),
            weatherCode: weather.hourly.weather_code[startIndex + index],
            temperature: weather.hourly.temperature_2m[startIndex + index],
            rainChance: weather.hourly.precipitation_probability[startIndex + index] ?? 0,
            windSpeed: weather.hourly.wind_speed_10m[startIndex + index],
        }));

    // Format API's local forecast time
    const formatHour = (time: string, index: number) => {
        if(index === 0) return "Now";

        const date = new Date(`${time.slice(0, 16)}:00Z`);

        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            timeZone: "UTC",
        }).format(date);
    }

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
            
            <div className="grid w-max min-w-full grid-flow-col grid-rows-1 auto-cols-[76px]
                sm:auto-cols-[84px] xl:auto-cols-[90px] gap-1">

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
                                {formatHour(hour.time, index)}
                            </span>

                            {/* Weather icon */}
                            <WeatherIcon
                                size={16}
                                strokeWidth={1.5}
                                className={getWeatherColor(hour.weatherCode)}
                            />

                            {/* Temperature */}
                            <span className="text-base font-medium text-[#294454]">
                                {Math.round(hour.temperature)}°
                            </span>

                            {/* Rain Probability */}
                            <div className="flex items-center gap-1">
                                <Droplets size={12} className="text-sky-400"/>
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