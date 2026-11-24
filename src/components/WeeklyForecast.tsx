import {
    Sun,
    CloudSun,
    Cloud,
    CloudRain,
    CloudDrizzle,
    CloudFog,
    Snowflake,
    CloudRainWind,
    CloudSnow,
    CloudLightning,
    CalendarDays,
    type LucideIcon,
} from "lucide-react";

import type { WeatherResponse } from "../types/weather";

// Define component's props
interface DailyForecastProps{
    weather: WeatherResponse;
};

/* -------------------------------------- Need to Change with this part -------------------------------------- */
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

/* ---------------------------------------------------------------------------- */

const WeeklyForecast = ({weather}: DailyForecastProps) => {

    // Transform Open-Meteo daily arrays into forecast objects
    const weeklyData = weather.daily.time.map((date, index) => {

        const forecastDate = new Date(`${date}T12:00:00Z`);

        const day = index === 0
            ? "Today"
            : new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                timeZone: "UTC",
            }).format(forecastDate);

        const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            timeZone: "UTC",
        }).format(forecastDate);

        const weatherCode = weather.daily.weather_code[index];

        return{
            day,
            date: formattedDate,
            condition: getWeatherIcon(weatherCode),
            weatherCode,
            rainChance: weather.daily.precipitation_probability_max[index] ?? 0,
            minTemp: Math.round(weather.daily.temperature_2m_min[index]),
            maxTemp: Math.round(weather.daily.temperature_2m_max[index]),
        }
    });

    {/* Find the lowest and highest temperatures of the week */}

    const minWeeklyTemp = Math.min(...weeklyData.map(item => item.minTemp));

    const maxWeeklyTemp = Math.max(...weeklyData.map(item => item.maxTemp));

    // Calculate total temperature range
    const tempRange = maxWeeklyTemp - minWeeklyTemp;

  return (
    <section className="space-y-3">

        {/* Section Heading */}
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-[#294454]">
                A look at the week
            </h2>

            <span className="text-[10px] text-slate-400">
                7-day forecast
            </span>
        </div>

        {/* Forecast Card */}
        <div className="rounded-xl bg-white p-4 sm:p-5">

            {/* Weather Summary */}
            <div className="mb-4 flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <p className="text-[13px] text-slate-500">
                    A sunny stretch before a cooler weekend.
                </p>

                <CalendarDays
                    size={13}
                    className="shrink-0 text-slate-400"
                />
            </div>

            {/* Daily forecast */}
            <div className="space-y-3">

                
                

                {weeklyData.map((item, index) => {
                    
                    const WeatherIcon = item.condition;

                    // Calculate temperature bar position based on weekly temperatue range
                    const left = ((item.minTemp - minWeeklyTemp) / tempRange) * 100;
                    const width = ((item.maxTemp - item.minTemp) / tempRange) * 100;

                    return(
                        <div
                            key={item.day}
                            className="grid grid-cols-[48px_22px_32px_minmax(0,1fr)_24px] items-center gap-2 
                                sm:grid-cols-[55px_25px_38px_minmax(0,1fr)_28px] sm:gap-3"
                        >
                            
                            {/* Day and date */}
                            <div className="flex flex-col">
                                <span className="text-[10px] font-medium text-[#294454]">
                                    {item.day}
                                </span>
                                <span className="text-slate-400 text-[8px]">
                                    {item.date}
                                </span>
                            </div>

                            {/* Weather icon */}
                            <WeatherIcon
                                size={15}
                                strokeWidth={1.5}
                                className={
                                    item.rainChance >= 50
                                    ? 'text-sky-500'
                                    : 'text-amber-500'
                                }
                            />

                            {/* Rain Probability */}
                            <span className="text-slate-400 text-[9px]">
                                {item.rainChance}%
                            </span>

                            {/* Temperature range */}
                            <div className="flex items-center gap-2">

                                <span className="w-5 text-right text-slate-400 text-[9px]">
                                    {item.minTemp}°
                                </span>

                                {/* Temperature Progress Bar */}
                                <div className="relative h-[3px] w-[150px] flex-1 rounded-full bg-slate-100">

                                    <div
                                        className={`absolute top-0 h-full rounded-full ${
                                            index === 0
                                                ? 'bg-gradient-to-r from-sky-300 to-amber-400'
                                                : 'bg-gradient-to-r from-sky-300 to-amber-300'
                                        }`}
                                        style={{
                                            left: `${left}%`,
                                            width: `${width}%`
                                        }}
                                    />

                                </div>

                                <span className="w-5 text-[9px] font-medium text-[#294454]">
                                    {item.maxTemp}°
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  )
}

export default WeeklyForecast