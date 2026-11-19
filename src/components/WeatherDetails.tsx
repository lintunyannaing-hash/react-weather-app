import {
    Wind,
    Sun,
    Droplets,
    Leaf,
    Sunrise,
    Eye,
    ArrowLeft,
} from "lucide-react";


const WeatherDetails = () => {
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
            <article className="flex min-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center jusitify-between">
                    <Wind size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        WIND
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-1">
                    <span className="text-3xl font-normal text-[#294454]">
                        14
                    </span>
                    <span className="text-slate-400 text-[10px]">
                        km/h
                    </span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2">

                    <div>
                        <p className="font-medium text-[12px] text-[#294454]">
                            Westerly
                        </p>

                        <p className="mt-1 text-slate-400 text-[10px]">
                            Gusts up to 24 km/h
                        </p>
                    </div>

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-sky-200">
                        <ArrowLeft
                            size={19}
                            className="text-sky-600"
                        />
                    </div>
                </div>
            </article>

            {/* UV Index */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center jusitify-between">
                    <Sun size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        UV INDEX
                    </span>
                </div>

                <span className="mt-4 text-3xl font-normal text-[#294454]">
                    4
                </span>

                <p className="font-medium text-[12px] text-[#294454] mt-2">
                    Moderate
                </p>

                {/* UV Indicator */}
                <div className="mt-3 grid grid-cols-5 gap-1">
                    <div className="rounded-full bg-amber-400 h-[3px]"></div>
                    <div className="rounded-full bg-amber-400 h-[3px]"></div>
                    <div className="rounded-full bg-amber-400 h-[3px]"></div>
                    <div className="rounded-full bg-slate-200 h-[3px]"></div>
                    <div className="rounded-full bg-slate-200 h-[3px]"></div>
                </div>

                <p className="mt-auto pt-3 leading-relaxed text-slate-400 text-[10px]">
                    Use SPF 30+ if you're heading outside.
                </p>
            </article>

            {/* Humidity */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center jusitify-between">
                    <Droplets size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        HUMIDITY
                    </span>
                </div>

                <span className="mt-4 text-3xl font-normal text-[#294454]">
                    72%
                </span>

                {/* Humidity Progress */}
                <div className="mt-4 h-[3px] w-full rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-sky-500 w-[72%]"></div>
                </div>

                <p className="font-medium text-[12px] text-[#294454] mt-auto pt-3">
                    Dew point 13°
                </p>

                <p className="mt-1 text-slate-400 text-[10px]">
                    Comfortable and fresh.
                </p>
            </article>

            {/* Air Quality */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center jusitify-between">
                    <Leaf size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        AIR QUALITY
                    </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-3xl font-normal text-[#294454]">
                        28
                    </span>

                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">
                        Good
                    </span>
                </div>

                {/* Air quality indicator */}
                <div className="mt-4 grid grid-cols-5 gap-1">
                    <div className="h-[3px] rounded-full bg-emerald-500" />
                    <div className="h-[3px] rounded-full bg-emerald-500" />
                    <div className="h-[3px] rounded-full bg-slate-200" />
                    <div className="h-[3px] rounded-full bg-slate-200" />
                    <div className="h-[3px] rounded-full bg-slate-200" />
                </div>

                <p className="font-medium text-[12px] text-[#294454] mt-5">
                    A good day to spend some time outdoors.
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                    US AQI · PM2.5
                </p>  
            </article>

            {/* 5. Sunrise and Sunset */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center jusitify-between">
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
                            6:50 AM
                        </p>

                        <p className="mt-1 text-slate-400 text-[9px]">
                            Sunrise
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-[11px] font-medium text-[#294454]">
                            7:18 PM
                        </p>

                        <p className="mt-1 text-slate-400 text-[9px]">
                            Sunset
                        </p>
                    </div>
                </div>

                <p className="mt-3 text-slate-400 text-[10px]">
                    12 hr 28 min of daylight
                </p>
            </article>

            {/* Visibility */}
            <article className="flex min-h-[190px] flex-col rounded-xl bg-white p-4">

                <div className="flex items-center jusitify-between">
                    <Eye size={15} className="text-slate-400" />
                    <span className="font-medium text-slate-500 text-[10px]">
                        VISIBILITY
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-1">
                    <span className="text-3xl font-normal text-[#294454]">
                        16
                    </span>
                    <span className="text-slate-400 text-[10px]">
                        km
                    </span>
                </div>

                <p className="mt-2 text-[10px] font-medium text-[#294454]">
                    A clear view
                </p>

                <div className="mt-auto border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[10px]">
                            Pressure
                        </span>

                        <span className="font-medium text-[10px] text-[#294454]">
                            1,015 hPa
                        </span>
                    </div>
                </div>

                <p className="mt-2 text-slate-400 text-[10px]">
                    Stable atmospheric pressure
                </p>
            </article>
        </div>
    </section>
  )
}

export default WeatherDetails