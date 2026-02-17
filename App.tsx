import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Map from './components/Map';
import { ForecastBox } from './components/ForecastBox';
import { Region } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState<Region>({
    latitude: 65.0000,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [markerCoords, setMarkerCoords] = useState<{latitude: number, longitude: number} | null>(null)

  //const [heading, setHeading] = useState<number>(0)

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null

    getCurrentLocation()

    /*
    const startCompassTracking = async (): Promise<void> => {
      try {
        const hasCompass = await Location.hasServicesEnabledAsync()
        if (!hasCompass) {
          console.log('Compass not available')
          return
        }

        subscription = await Location.watchHeadingAsync((
          headingData) => {
            setHeading(headingData.trueHeading || headingData.magHeading)
          })

      } catch (error) {
        console.log(error);
      }
    }
    startCompassTracking()
    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
    */

  }, [])
  

  const getCurrentLocation = async(): Promise<void> => {
    try{
      const { status } = await Location.requestForegroundPermissionsAsync()
    
      if (status !== 'granted') {
        console.log('Permission not granted')
        return
      }

      const getCurrentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      })
      setLocation({
        ...location,
        latitude: getCurrentLocation.coords.latitude,
        longitude: getCurrentLocation.coords.longitude,
      })

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <View style={styles.container}>
      <Map region={location} heading={0} onMarkerChange={setMarkerCoords} />
      <ForecastBox 
        latitude={markerCoords?.latitude ?? null} 
        longitude={markerCoords?.longitude ?? null} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
