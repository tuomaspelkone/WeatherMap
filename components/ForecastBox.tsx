// Create a new component file, e.g., ForecastBox.tsx

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getForecast } from '../utils/getForecast';
import type { WeatherResponse } from '../types/forecastTypes.ts';

interface ForecastBoxProps {
    latitude: number | null;
    longitude: number | null;
}

export function ForecastBox({ latitude, longitude }: ForecastBoxProps) {
    const [forecast, setForecast] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (latitude === null || longitude === null) {
            setForecast(null);
            return;
        }

        async function loadForecast() {
            setLoading(true);
            setError(null);
            try {
                const data = await getForecast(latitude!, longitude!);
                setForecast(data);
            } catch (err) {
                setError('Failed to load forecast');
            } finally {
                setLoading(false);
            }
        }

        loadForecast();
    }, [latitude, longitude]);

    if (!latitude || !longitude) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Napauta karttaa nähdäksesi säätiedot</Text>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.text}>Ladataan...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!forecast) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{forecast.name}</Text>
            <Text style={styles.text}>Lämpötila: {forecast.main.temp}°C</Text>
            <Text style={styles.text}>Tuntuu kuin: {forecast.main.feels_like}°C</Text>
            <Text style={styles.text}>Kosteus: {forecast.main.humidity}%</Text>
            <Text style={styles.text}>Tuuli: {forecast.wind.speed} m/s</Text>
            <Text style={styles.text}>{forecast.weather[0].description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});