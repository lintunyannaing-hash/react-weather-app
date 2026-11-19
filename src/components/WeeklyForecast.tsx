import {
    Sun,
    CloudSun,
    Cloud,
    CloudRain,
    CloudDrizzle,
    CalendarDays,
    type LucideIcon,
} from "lucide-react";

// Forecast data structure
interface DailyForecastItem{
    day: string;
    date: string;
    condition: LucideIcon;
    rainChance: number;
    minTemp: number;
    maxTemp: number;
};

// Temporary Weather Data
const weeklyData: DailyForecastItem[] = [
    { day: 'Today', date: 'Sep 15', condition: CloudSun, rainChance: 0, minTemp: 14, maxTemp: 21 },
    { day: 'Wed', date: 'Sep 16', condition: Sun, rainChance: 5, minTemp: 15, maxTemp: 23 },
    { day: 'Thu', date: 'Sep 17', condition: Sun, rainChance: 5, minTemp: 16, maxTemp: 24 },
    { day: 'Fri', date: 'Sep 18', condition: CloudSun, rainChance: 15, minTemp: 15, maxTemp: 22 },
    { day: 'Sat', date: 'Sep 19', condition: Cloud, rainChance: 20, minTemp: 14, maxTemp: 20 },
    { day: 'Sun', date: 'Sep 20', condition: CloudRain, rainChance: 65, minTemp: 14, maxTemp: 18 },
    { day: 'Mon', date: 'Sep 21', condition: CloudDrizzle, rainChance: 30, minTemp: 13, maxTemp: 19 },
];

const WeeklyForecast = () => {
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