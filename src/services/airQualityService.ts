import type { AirQualityResponse } from "../types/airQuality";


const AIR_QUALITY_API_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

export const getAirQualityData = async (
    latitude: number,
    longitude: number,
    signal?: AbortSignal
): Promise<AirQualityResponse> => {

    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),

        current: "us_aqi,pm2_5",

        timezone: "auto",
    });

    const response = await fetch(
        `${AIR_QUALITY_API_URL}?${params.toString()}`,
        { signal }
    );

    if(!response.ok){
        throw new Error(
            `Air Quality API error: ${response.status} ${response.statusText}`
        );
    }

    const data: AirQualityResponse = await response.json();

    return data;
}