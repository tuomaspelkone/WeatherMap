import type { WeatherResponse } from '../types/forecastTypes.ts';
import { OPENWEATHERMAP_API_KEY } from '../config';

const API_KEY = OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getForecast(latitude: number, longitude: number, units: string = 'metric'): Promise<WeatherResponse> {
    try {
        const response = await fetch(
            `${BASE_URL}?lat=${latitude}&lon=${longitude}&units=${units}&lang=fi&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`);
        }

        const data: WeatherResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch forecast:', error);
        throw error;
    }
}