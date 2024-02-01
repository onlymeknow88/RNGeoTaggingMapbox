import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';

MapboxGL.setAccessToken('pk.eyJ1Ijoib255bWVrbm93IiwiYSI6ImNrenl5cXZndTA1MXQzY3F4bjJxeTN4NTYifQ.e7Kn2mLxCSQmBNIQVxTSPA');

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Request permission and get current location
    const getLocation = async () => {
      try {
        if (Platform.OS === 'android') {
          const hasLocationPermission = await Geolocation.hasLocationPermission();

          if (hasLocationPermission === 'granted') {
            Geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
              },
              (error) => console.error(error),
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          } else {
            console.warn('Location permission denied');
          }
        } else {
          console.warn('react-native-geolocation-service is not implemented for iOS in this example');
        }
      } catch (err) {
        console.error(err);
      }
    };

    getLocation();
  }, []);

  return (
    <MapboxGL.MapView
      style={{ flex: 1 }}
      centerCoordinate={currentLocation ? [currentLocation.longitude, currentLocation.latitude] : [0, 0]}
      zoomLevel={currentLocation ? 12 : 1}
    >
      {currentLocation && (
        <MapboxGL.PointAnnotation
          key="currentLocation"
          id="currentLocation"
          coordinate={[currentLocation.longitude, currentLocation.latitude]}
        >
          <MapboxGL.Callout title="You are here" />
        </MapboxGL.PointAnnotation>
      )}
    </MapboxGL.MapView>
  );
};

export default App;
