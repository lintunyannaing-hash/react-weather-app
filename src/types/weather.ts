
export interface CurrentWeatherData {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    pressure_msl: number;
}

export interface HourlyWeatherData {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    wind_speed_10m: number[];
    weather_code: number[];
    visibility: number[];
    uv_index: number[];
}

export interface DailyWeatherData {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
}

export interface WeatherResponse {
    latitude: number;
    longitude: number;
    timezone: string;
    current: CurrentWeatherData;
    hourly: HourlyWeatherData;
    daily: DailyWeatherData;
}

export type TemperatureUnit = "C" | "F";