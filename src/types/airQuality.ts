export interface AirQualityResponse {
    latitude: number;
    longitude: number;
    timezone: string;

    current: {
        time: string;
        interval: number;
        us_aqi: number;
        pm2_5: number;
    };
};