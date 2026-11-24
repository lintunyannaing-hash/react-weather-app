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
    Star,
    Wind,
    Droplets,
    Umbrella,
    MapPin,
    type LucideIcon,
} from "lucide-react";

import heroImage from "../assets/heroImage.jpg";

// import type for props that come from App.tsx
import type { WeatherResponse, CurrentWeatherData } from "../types/weather";

interface CurrentWeatherProps {
    weather: WeatherResponse;
};

// Convert Open-Meteo weather codes into readable descriptions
const getWeatherDescription = (code: number): string => {
    if(code === 0) return "Clear sky";
    if(code === 1) return "Mainly clear";
    if(code === 2) return "Partly cloudy";
    if(code === 3) return "Overcast";
    if(code >= 45 && code <= 48) return "Foggy";
    if(code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Rain showers";
    if (code >= 85 && code <= 86) return "Snow showers";
    if (code >= 95) return "Thunderstorm";

    return "Unknown conditions";
}

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

const CurrentWeather = ({weather}: CurrentWeatherProps) => {
    const current = weather.current; // current is an object that holds data from API
    const today = weather.daily; // today also is an object

    const temperature = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const high = Math.round(today.temperature_2m_max[0]);
    const low = Math.round(today.temperature_2m_min[0]);
    const description = getWeatherDescription(current.weather_code);

    const windSpeed = Math.round(current.wind_speed_10m);
    const humidity = current.relative_humidity_2m;
    const rainChance = weather.hourly.precipitation_probability[0] ?? 0;
    
    const WeatherIcon = getWeatherIcon(current.weather_code);
    const WeatherColor = getWeatherColor(current.weather_code);

    // Full Date and TimeLine according to object
    function getLocalForecastDateTime(
        current: CurrentWeatherData, 
        timezone: string, 
        utcOffsetSeconds: number
    ){
        const utcTimestamp = new Date(
            Date.parse(`${current.time}Z`) - utcOffsetSeconds * 1000
        );

        const date = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(utcTimestamp);

        const time = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short"
        }).format(utcTimestamp);

        return { date, time };
    };

    const localDateTime = getLocalForecastDateTime(
        weather.current,
        weather.timezone,
        weather.utc_offset_seconds,
    )
    

  return (
    <section className="space-y-4">

        {/* Loaction and Date */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            {/* Location */}
            <div className="space-y-1">
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-500">
                    <MapPin size={11} />
                    California, United States
                </div>
                
                <div className="flex items-center gap-2">
                    <h1 className="font-serif text-2xl text-[#294454] sm:text-3xl">
                        San Franciso
                    </h1>

                    <button
                        type="button"
                        aria-label="Add San Franciso to saved places"
                        className="text-slate-400 transition hover:text-amber-500"
                    >
                        <Star size={15} />
                    </button>
                </div>
            </div>

            {/* Date */}
            <div className="text-left sm:text-right">
                <p className="text-xs font-medium text-slate-600">
                    {localDateTime.date}
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                    ● {localDateTime.time} · Local time
                </p>
            </div>
        </div>

        {/* Current Weather hero */}
        <div
            className="relative isolate min-h-[230px] overflow-hidden rounded-2xl bg-[#dceaf0] bg-cover bg-center sm:min-h-[250px]"
            style={{
                backgroundImage: `url(${heroImage})`
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#e3eff3]/95 via-[#e3eff3]/75 to-transparent" />

            {/* Weather Alert Badge */}
            <div
                className={`absolute right-4 top-4 z-20 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border px-3 py-1.5 shadow-sm backdrop-blur-md ${
                    current.weather_code >= 95
                        ? "border-red-200 bg-red-50/90"
                        : "border-emerald-200 bg-emerald-50/90"
                }`}
            >
                {/* Status Indicator */}
                <span className="relative flex h-2 w-2 shrink-0">
                    <span
                        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-50 ${
                            current.weather_code >= 95
                                ? "bg-red-500"
                                : "bg-emerald-500"
                        }`}
                    />

                    <span
                        className={`relative inline-flex h-2 w-2 rounded-full ${
                            current.weather_code >= 95
                                ? "bg-red-500"
                                : "bg-emerald-500"
                        }`}
                    />
                </span>

                {/* Status Text */}
                <span
                    className={`whitespace-nowrap text-xs font-medium ${
                        current.weather_code >= 95
                            ? "text-red-700"
                            : "text-emerald-700"
                    }`}
                >
                    {current.weather_code >= 95
                        ? "Thunderstorm conditions"
                        : "No Weather alert"}
                </span>
            </div>

            {/* Main Weather Content */}
            <div className="relative z-10 flex min-h-[230px] flex-col justify-center gap-3 p-5 sm:min-h-[250px] sm:w-3/4 sm:p-7">

                {/* Current Status */}
                <p className="text-[9px] font-semibold uppercase tracking-wider text-[#36586a]">
                    ● Right now
                </p>

                {/* Temperature and Conditions */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                    <span className="text-6xl font-light tracking-tight text-[#243f50] sm:text-7xl">
                        {temperature}°
                    </span>

                    <div className="space-y-1">
                        <WeatherIcon
                            size={28}
                            strokeWidth={1.3}
                            className={WeatherColor}
                        />

                        <p className="text-sm font-medium text-[#294454]">
                            {description}
                        </p>

                        <p className="text-[11px] text-[#536d7a]">
                            Feels like {feelsLike}° · H: {high}° · L: {low}°
                        </p>
                    </div>
                </div>

                {/* Weather Description */}
                <p className="max-w-md text-[11px] leading-relaxed text-[#405e6d]">
                    A slow morning, a brighter afternoon. Coastal clouds
                    will give way to sunshine, with a light breeze off the bay.
                </p>

                {/* Weather Information */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-[#405e6d]">

                    <span className="flex items-center gap-1">
                        <Wind size={12} className="text-sky-600" />
                        W {windSpeed} km/h
                    </span>

                    <span className="flex items-center gap-1">
                        <Droplets size={12} className="text-sky-600" />
                        {humidity}% humidity
                    </span>

                    <span className="flex items-center gap-1">
                        <Umbrella size={12} className="text-sky-600" />
                        {rainChance}% chance of rain
                    </span>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CurrentWeather