import { useEffect, useState } from "react";

import { getWeatherData } from "../services/weatherService";
import type { WeatherResponse } from "../types/weather";

// Describes the state managed by our hook
interface WeatherState {
    data: WeatherResponse | null;
    isLoading: boolean;
    error: string | null;
};

export const useWeather = (
    latitude?: number,
    longitude?: number
) => {
    const [weatherState, setWeatherState] = useState<WeatherState>({
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const controller = new AbortController();

        const fetchWeather = async() => {
            try{
                setWeatherState((previousState) => ({
                    ...previousState,
                    isLoading: true,
                    error: null,
                }));

                const data = await getWeatherData(
                    latitude,
                    longitude,
                    controller.signal
                );

                setWeatherState({
                    data,
                    isLoading: false,
                    error: null,
                })
            } catch(error) {
                if(controller.signal.aborted){
                    return;
                }

                setWeatherState({
                    data: null,
                    isLoading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Something went wrong while fetching weather data.",
                });
            }
        };

        fetchWeather();

        return () => {
            controller.abort();
        };

    }, [latitude, longitude]);

    return weatherState;
}