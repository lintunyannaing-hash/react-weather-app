import {
    Wind,
    Sun,
    Droplets,
    Leaf,
    Sunrise,
    Eye,
    ArrowLeft,
} from "lucide-react";

import type { WeatherResponse } from "../types/weather";
import type { AirQualityResponse } from "../types/airQuality";

interface WeatherDetailsProps{
    weather: WeatherResponse;
    airQuality: AirQualityResponse | null;
};

interface UVProgressBarProps{
    bars: number;
    color: string;
    advice: string;
};

interface AirQualityBarProps{
    Bars: number;
    Status: string;
    Color: string;
    Advice: string;
    bg_status: string,
    text_status: string;
};

const WeatherDetails = ({weather, airQuality}: WeatherDetailsProps) => {

    // Find hourly forecast entry matching the current time
    const currentHourIndex = weather.hourly.time.findIndex(
        (time) =>
            time.slice(0, 13) === weather.current.time.slice(0, 13)
    );

    // Use the matching hour, or the first avaliable hour as fallback
    const hourlyIndex = currentHourIndex >= 0 ? currentHourIndex : 0;

    // Find daily forecast entry matching the current date ( 0 - 9 === valid)
    const currentDateIndex = weather.daily.time.findIndex(
        (time) =>
            time === weather.current.time.slice(0, 10)
    );

    // Use the matching date, or the first avaliable hour as fallback
    const dailyIndex = currentDateIndex !== -1 ? currentDateIndex : 0;

    // Wind Informations
    const windSpeed = Math.round(weather.current.wind_speed_10m);
    const windGusts = Math.round(weather.current.wind_gusts_10m);
    const windDirection_10m = weather.current.wind_direction_10m;

    const calculateWindDirection = (degree: number): string => {
        // Wind Direction value
        const windDirectionsArr = [
            "North", "North-Northeast", "Northeast", "East-Northeast",
            "East", "East-Southeast", "Southeast", "South-Southeast",
            "South", "South-Southwest", "Southwest", "West-Southwest",
            "West", "West-Northwest", "Northwest", "North-Northwest"
        ];

        const normalizedDegree = ((degree % 360) + 360) % 360;

        const index = Math.round(normalizedDegree / 22.5) % 16;
        return windDirectionsArr[index];
    };

    // UV Informations
    
    const uvIndex = weather.hourly.uv_index[hourlyIndex];

    const uvLevel = (uv: number): string => {
        if(!Number.isFinite(uv) || uv < 0) return "Invalid UV Index";

        const value = Math.floor(uv);

        switch(true){
            case (value <= 2):
                return "Low";
            case (value <= 5):
                return "Moderate";
            case (value <= 7):
                return "High";
            case (value <= 10):
                return "Very High";
            default:
                return "Extreme";
        }
    };

    // For UV Progress Bar
    const getUVConfig = (uv: number) => {
        if(uv === null || uv === undefined || uv < 0){
            return{
                bars: 0,
                color: "bg-slate-200",
                advice: "Check local UV levels before heading outside.",
            };
        }

        switch(true) {
            case uv < 3:
                return {
                    bars: 1,
                    color: "bg-emerald-400",
                    advice: "Minimal protection needed; wear SPF 15+ if outside for long."
                };
            case uv < 6:
                return {
                    bars: 2,
                    color: "bg-amber-400",
                    advice: "Use SPF 30+ and seek shade during midday hours."
                };
            case uv < 8:
                return {
                    bars: 3,
                    color: "bg-orange-500",
                    advice: "Use SPF 30-50+, wear a hat, and limit midday sun."
                };
            case uv < 11:
                return {
                    bars: 4,
                    color: "bg-rose-500",
                    advice: "Use SPF 50+, cover up, and avoid direct midday sun."
                };
            default:
                return {
                    bars: 5,
                    color: "bg-purple-500",
                    advice: "Extreme UV: Use SPF 50+ and stay indoors or in full shade."
                };
        }
    };

    const { bars, color, advice}: UVProgressBarProps = getUVConfig(uvIndex);

    // Humidity section
    const humidity = weather.current.relative_humidity_2m;
    // Humidity Progress bar
    const humidityProgress = Math.min(100, Math.max(0, humidity));
    // dew point
    const dewPoint = Math.round(weather.current.dew_point_2m);

    // Now: They are calculated based on "Celsius(C)"
    const getDewPointStatus = (point: number): string => {
        if(!Number.isFinite(point)){
            return "Unavailable!";
        }

        if(point < 10){ // 50 F
            return "Dry & fast sweat evaporation";
        } else if(point >= 10 && point <= 15){ // 50 - 60 F
            return "Comfortable & fresh";
        } else if(point >= 16 && point <= 19){ // 61 - 67 F
            return "Noticeably Humid";
        } else { // 20 C above || 68 F above
            return "Sticky & Oppressive";
        }
    };
    // -------------------------------------------------------------------------
    // Air quality
    const airQualityIndex = airQuality?.current.us_aqi;
    const PM2_5 = airQuality?.current.pm2_5;

    // For Air Quality Progress Bar
    const getAQIConfig = (aqi: number| null | undefined): AirQualityBarProps => {
        if(!Number.isFinite(aqi) || aqi < 0){
            return{
                Bars: 0,
                Status: "none",
                Color: "bg-slate-200",
                Advice: "Invalid Air Quality Index!",
                bg_status: "bg-slate-50",
                text_status: "text-slate-700"
            };
        }

        switch(true){
            case (aqi <= 50):
                return{
                    Bars: 1,
                    Status: "Good",
                    Color: "bg-emerald-400",
                    Advice: "Enjoy outdoor activities, walking, running, and exercise",
                    bg_status: "bg-emerald-50",
                    text_status: "text-emerald-700",
                };
            case (aqi <= 100):
                return{
                    Bars: 2,
                    Status: "Moderate",
                    Color: "bg-amber-400",
                    Advice: "Most people can enjoy outdoor activities except sensitive people",
                    bg_status: "bg-amber-50",
                    text_status: "text-amber-700",
                };
            case (aqi <= 150):
                return{
                    Bars: 3,
                    Status: "Unhealthy for Sensitive Groups",
                    Color: "bg-orange-500",
                    Advice: "Children, older adults, and people with heart or lung conditions should take extra care",
                    bg_status: "bg-orange-50",
                    text_status: "text-orange-700",
                };
            case (aqi <= 200):
                return{
                    Bars: 4,
                    Status: "Unhealthy",
                    Color: "bg-rose-500",
                    Advice: "Reduce prolonged outdoor exercise",
                    bg_status: "bg-rose-50",
                    text_status: "text-rose-700",
                };
            case (aqi <= 300):
                return{
                    Bars: 5,
                    Status: "Very Unhealthy",
                    Color: "bg-rose-600",
                    Advice: "Reduce prolonged outdoor exercise",
                    bg_status: "bg-rose-100",
                    text_status: "text-rose-800",
                };
            default:
                return{
                    Bars: 5,
                    Status: "Hazardous",
                    Color: "bg-purple-500",
                    Advice: "Avoid all outdoor physical activity. Stay indoors and keep activity levels low",
                    bg_status: "bg-purple-50",
                    text_status: "text-purple-700",
                };
            
        }
    };

    const { Bars, Status, Color, Advice, bg_status, text_status }: AirQualityBarProps = getAQIConfig(airQualityIndex);

    // --------------------------------------------------------------------------

    // Sunrise and Sunset Section
    // ----------------------------------------------------------------
    const sunRise = weather.daily.sunrise[dailyIndex];
    const sunSet = weather.daily.sunset[dailyIndex];

    const formatSunTime = (time: string): string => {
        const date = new Date(`${time}:00Z`);

        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
        }).format(date);
    };

    const formattedSunrise = formatSunTime(sunRise);
    const formattedSunset = formatSunTime(sunSet);

    const calculateDaylight = (sunrise: string, sunset: string): string => {
        const sunriseDate = new Date(`${sunrise}:00Z`);
        const sunsetDate = new Date(`${sunset}:00Z`);

        const difference = sunsetDate.getTime() - sunriseDate.getTime(); // Get the result in milliSeconds

        const totalMinutes = Math.floor(difference / (1000 * 60));

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return `${hours} hr ${minutes} min`
    };

    const daylightDuration = calculateDaylight(sunRise, sunSet);
    // -------------------------------------------------------------------------

    // visibility: convert meters into kilometers
    const visibility = Number(weather.hourly.visibility[hourlyIndex] / 1000).toFixed(1);

    const getVisibilityStatus = (value: number): string => {
        if(!Number.isFinite(value) || value < 0){
            return "Unavailable";
        };

        if (value < 1){
            return "A Poor(Fog) View";
        } else if (value < 4){
            return "A Low View";
        } else if (value < 10){
            return "A Moderate View";
        } else {
            return "A Clear View";
        }
        
    };

    // Atmosperic Pressure
    const currentPressure = Math.round(weather.current.pressure_msl);

    const prev3hPressure = currentHourIndex >= 3
        ? Math.round(weather.hourly.pressure_msl[currentHourIndex - 3])
        : currentPressure;

    const getPressureStatus = (currentAtm: number, prev3hAtm: number): string => {
        if(
            currentAtm === null || currentAtm === undefined || Number.isNaN(currentAtm) || currentAtm < 0 ||
            prev3hAtm === null || prev3hAtm === undefined || Number.isNaN(prev3hAtm) || prev3hAtm < 0
        ) {
            return "Unavaliable";
        }

        const diff = currentAtm - prev3hAtm;

        if(diff >= 3) {
            return "Rising rapidly";
        } else if (diff >= 1) {
            return "Rising slowly";
        } else if (diff > -1 && diff < 1) {
            return "Steady";
        } else if (diff > -3) {
            return "Falling slowly";
        } else {
            return "Falling rapidly";
        }
    }

    const status = getPressureStatus(currentPressure, prev3hPressure);

  return (
    <section className="space-y-3">

        {/* Section Heading */}
        <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-[#294454]">
                The details that matter
            </h2>

            <span className="text-[10px] text-slate-400">
                Current conditions
            </span>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">

            {/* 1. Wind */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center justify-between">
                    <Wind size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        WIND
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-1">
                    <span className="text-3xl font-normal text-[#294454]">
                        {windSpeed}
                    </span>
                    <span className="text-slate-400 text-[10px]">
                        km/h
                    </span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2">

                    <div>
                        <p className="font-medium text-[12px] text-[#294454]">
                            {calculateWindDirection(windDirection_10m)}
                        </p>

                        <p className="mt-1 text-slate-400 text-[10px]">
                            Gusts up to {windGusts} km/h
                        </p>
                    </div>

                    {/* -------------------- Need to make this Arrow => active */}
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-sky-200">
                        <ArrowLeft
                            size={19}
                            className="text-sky-600"
                        />
                    </div>
                    {/* ----------------------------------------------------------------- */}
                </div>
            </article>

            {/* UV Index */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center justify-between">
                    <Sun size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        UV INDEX
                    </span>
                </div>

                <span className="mt-4 text-3xl font-normal text-[#294454]">
                    {uvIndex}
                </span>

                <p className="font-medium text-[12px] text-[#294454] mt-2">
                    {uvLevel(uvIndex)}
                </p>

                {/* UV Indicator (Progress Bar) */}
                <div className="mt-3 grid grid-cols-5 gap-1">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div
                            key={step}
                            className={`h-[3px] rounded-full transition-colors duration-300
                                ${
                                    step <= bars ? color : "bg-slate-200"
                                }
                            `}
                        ></div>
                    ))}
                </div>

                <p className="mt-auto pt-3 leading-relaxed text-slate-400 text-[10px]">
                    {advice}
                </p>
            </article>

            {/* Humidity */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center justify-between">
                    <Droplets size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        HUMIDITY
                    </span>
                </div>

                <span className="mt-4 text-3xl font-normal text-[#294454]">
                    {humidity}%
                </span>

                {/* Humidity Progress */}
                <div className="mt-4 h-[3px] w-full rounded-full bg-slate-100">
                    <div 
                        className="h-full rounded-full bg-sky-500"
                        style={{ width: `${humidityProgress}%`}}
                    ></div>
                </div>

                <p className="font-medium text-[12px] text-[#294454] mt-auto pt-3">
                    Dew point {dewPoint}°
                </p>

                <p className="mt-1 text-slate-400 text-[10px]">
                    {getDewPointStatus(dewPoint)}
                </p>
            </article>

            {/* Air Quality */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center justify-between">
                    <Leaf size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        AIR QUALITY
                    </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-3xl font-normal text-[#294454]">
                        {airQualityIndex}
                    </span>

                    <span 
                        className={`rounded-full px-2 py-1 text-[10px] ${bg_status} ${text_status}`}
                    >
                        {Status}
                    </span>
                </div>

                {/* Air quality indicator */}
                <div className="mt-4 grid grid-cols-5 gap-1">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div
                            key={step}
                            className={`h-[3px] rounded-full transition-colors duration-300
                                ${
                                    step <= Bars ? Color: "bg-slate-200"
                                }
                            `}
                        ></div>
                    ))}
                </div>

                <p className="font-medium text-[12px] text-[#294454] mt-5">
                    {Advice}
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                    US AQI · PM2.5: {PM2_5?.toFixed(1) ?? "--"} µg/m³
                </p>  
            </article>

            {/* 5. Sunrise and Sunset */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center justify-between">
                    <Sunrise size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        SUNRISE & SUNSET
                    </span>
                </div>

                {/* Sunrise curve */}
                <div className="mt-3 flex justify-center">
                    <svg
                        viewBox="0 0 200 75"
                        className="h-16 w-full"
                        fill="none"
                        aria-label="Sunrise to sunset curve"
                    >
                        <path
                            d="M 5 65 Q 100 -35 195 65"
                            stroke="#E8A34C"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                        />

                        <circle 
                            cx="5"
                            cy="65"
                            r="2.5"
                            fill="#E8A34C"
                        />
                        
                        <circle
                            cx="195"
                            cy="65"
                            r="2.5"
                            fill="#E8A34C"
                        />
                    </svg>
                </div>

                <div className="mt-1 flex justify-between gap-2">

                    <div>
                        <p className="font-medium text-[11px] text-[#294454]">
                            {formattedSunrise}
                        </p>

                        <p className="mt-1 text-slate-400 text-[9px]">
                            Sunrise
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-[11px] font-medium text-[#294454]">
                            {formattedSunset}
                        </p>

                        <p className="mt-1 text-slate-400 text-[9px]">
                            Sunset
                        </p>
                    </div>
                </div>

                <p className="mt-3 text-slate-400 text-[10px]">
                    {daylightDuration} of daylight
                </p>
            </article>

            {/* Visibility */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center justify-between">
                    <Eye size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        VISIBILITY
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-1">
                    <span className="text-3xl font-normal text-[#294454]">
                        {visibility}
                    </span>
                    <span className="text-slate-400 text-[10px]">
                        km
                    </span>
                </div>

                <p className="mt-2 text-[10px] font-medium text-[#294454]">
                    {getVisibilityStatus(visibility)}
                </p>

                <div className="mt-auto border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[10px]">
                            Pressure
                        </span>

                        <span className="font-medium text-[10px] text-[#294454]">
                            {currentPressure} hPa
                        </span>
                    </div>
                </div>

                <p className="mt-2 text-slate-400 text-[10px]">
                    {status}
                </p>
            </article>
        </div>
    </section>
  )
}

export default WeatherDetails