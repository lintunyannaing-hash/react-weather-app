import {
    CloudSun,
    Star,
    Wind,
    Droplets,
    Umbrella,
    MapPin,
} from "lucide-react";

import heroImage from "../assets/heroImage.jpg";

const CurrentWeather = () => {
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
                    Tuesday, September 15, 2026
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                    ● 10:45 AM PDT · Local time
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

            {/* Image Overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#e3eff3]/95 via-[#e3eff3]/75 to-transparent" >
                <div className="flex flex-row justify-between">
                    {/* LEFT Container */}
                    <div className="flex min-h-[230px] flex-col justify-center gap-3 p-5 sm:min-h-[250px] sm:w-3/4 sm:p-7">

                        {/* Current Status */}
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#36586a]">
                            ● Right now
                        </p>

                        {/* Temperature and conditions */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                            <span className="text-6xl font-light tracking-tight text-[#243f50] sm:text-7xl">
                                18°
                            </span>

                            <div className="space-y-1">
                                <CloudSun
                                    size={28}
                                    strokeWidth={1.3}
                                    className="text-amber-300"
                                />

                                <p className="text-sm font-medium text-[#294454]">
                                    Partly cloudy
                                </p>

                                {/* Feels like */}
                                <p className="text-[11px] text-[#536d7a]">
                                    Feels like 18° · H: 21° · L: 14° 
                                </p>
                            </div>
                        </div>

                        {/* Descriptions */}
                        <p className="max-w-md text-[11px] leading-relaxed text-[#405e6d]">
                            A slow morning, a brighter afternoon. Coastal clouds
                            will give way to sunshine, with a ligh breeze off the Day.
                        </p>

                        {/* Weather Informations */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-[#405e6d]">
                            <span className="flex items-center gap-1">
                                <Wind size={12} className="text-sky-600" />
                                W 14 km/h
                            </span>

                            <span className="flex items-center gap-1">
                                <Droplets size={12} className="text-sky-600" />
                                72% humidity
                            </span>

                            <span className="flex items-center gap-1">
                                <Umbrella size={12} className="text-sky-600" />
                                10% chance of rain
                            </span>
                        </div>
                    </div>

                    {/* Right Container */}
                    <div className="absolute top-5 right-3 flex gap-1 bg-white rounded-2xl px-2 py-1">
                        <span className="text-serif text-xs text-slate-700">◉ No Wealther alerts</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CurrentWeather