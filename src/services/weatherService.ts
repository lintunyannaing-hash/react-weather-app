
import type { WeatherResponse } from "../types/weather";

// Default location for San Franciso
const DEFAULT_LATITUDE = 37.7749;
const DEFAULT_LONGITUDE = -122.4149;

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

export const getWeatherData = async (
    latitude: number = DEFAULT_LATITUDE,
    longitude: number = DEFAULT_LONGITUDE,
    signal?: AbortSignal
): Promise<WeatherResponse> => {

    const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),

    current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "precipitation",
        "weather_code",
        "wind_speed_10m",
        "wind_direction_10m",
        "wind_gusts_10m",
        "pressure_msl",
        "dew_point_2m",
    ].join(","),

    hourly: [
        "temperature_2m",
        "precipitation_probability",
        "wind_speed_10m",
        "weather_code",
        "visibility",
        "uv_index",
        "pressure_msl",
    ].join(","),

    daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_max",
        "sunrise",
        "sunset",
        "uv_index_max",
    ].join(","),

    timezone: "auto",
    forecast_days: "7",
    });

    const response = await fetch(
        `${WEATHER_API_URL}?${params.toString()}`,
        { signal }
    );

    if (!response.ok) {
        throw new Error(
            `Weather API error: ${response.status} ${response.statusText}`
        );
    }

    const data: WeatherResponse = await response.json();

    return data;
};