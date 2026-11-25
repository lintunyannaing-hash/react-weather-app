import { useEffect, useState } from "react";

import { getAirQualityData } from "../services/airQualityService";
import type { AirQualityResponse } from "../types/airQuality";

// Describe the state managed by our hook
interface AirQualityState {
    data: AirQualityResponse | null;
    isLoading: boolean;
    error: string | null;
};

export const useAirQuality = (
    latitude: number,
    longitude: number,
) => {
    const [airQualityState, setAirQualityState] = 
        useState<AirQualityState>({
            data: null,
            isLoading: true,
            error: null,
        });

    useEffect(() => {
        const controller = new AbortController();

        const fetchAirQuality = async() => {
            try{
                setAirQualityState((prevState) => ({
                    ...prevState,
                    isLoading: true,
                    error: null,
                }));

                const data = await getAirQualityData(
                    latitude,
                    longitude,
                    controller.signal
                );

                // testing
                console.log(data);

                setAirQualityState({
                    data,
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                if(controller.signal.aborted){
                    return;
                }

                setAirQualityState({
                    data: null,
                    isLoading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Something went wrong while fetching air quality data."
                });
            }
        };

        fetchAirQuality();

        return() => {
            controller.abort();
        };
    }, [latitude, longitude]);

    return airQualityState;
}