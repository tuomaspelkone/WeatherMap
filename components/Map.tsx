import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Region, Marker } from 'react-native-maps';


interface MapProps {
    region: Region
    heading: number
    onMarkerChange?: (coordinates: {latitude: number, longitude: number} | null) => void
}



export default function Map({region, heading, onMarkerChange}: MapProps) {

const [marker, setMarker] = useState<{latitude: number, longitude: number} | null>(null)

  return (
    <MapView 
    style={styles.map} 
    region={region}
    mapType='satellite'
    onPress={(event) => {
        const coords = event.nativeEvent.coordinate
        setMarker(coords)
        onMarkerChange?.(coords)
      }}
    camera= {heading !== undefined ? {
        center: {
            latitude: region.latitude,
            longitude: region.longitude,
        },
        pitch: 0,
        zoom: 15,
        heading: heading
    } : undefined}
    >
      <Marker 
      coordinate={{
        latitude: region.latitude,
        longitude: region.longitude,
      }}
      title = 'Sijaintisi'
      description = 'Olet tässä'
      pinColor = 'blue' />

      {marker && (
        <Marker
        coordinate={marker}
        pinColor='red'
        />
      )}
      
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
