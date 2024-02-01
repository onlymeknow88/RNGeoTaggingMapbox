import {Button, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import Geolocation from 'react-native-geolocation-service';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(
  'pk.eyJ1Ijoib255bWVrbm93IiwiYSI6ImNrenl5cXZndTA1MXQzY3F4bjJxeTN4NTYifQ.e7Kn2mLxCSQmBNIQVxTSPA',
);

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setCurrentLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setCurrentLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
   //  console.log(location);
  };
  useEffect(() => {
    // Request permission and get current location
    

    getLocation();
  });
  const renderAnnotations = () => {

    return (
      <Mapbox.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={[currentLocation.coords.longitude, currentLocation.coords.latitude]}>
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#00cccc',
            borderRadius: 50,
            borderColor: '#fff',
            borderWidth: 3,
          }}
        />
      </Mapbox.PointAnnotation>
    );
  };
  return (
    <View style={{flex: 1, height: '100%', width: '100%'}}>
      <Mapbox.MapView
        styleURL={Mapbox.StyleURL.Street}
        zoomLevel={16}
        centerCoordinate={currentLocation ? [currentLocation.coords.longitude, currentLocation.coords.latitude] : [0, 0]}
        style={{flex: 1}}>
        <Mapbox.Camera
          zoomLevel={16}
          centerCoordinate={currentLocation ? [currentLocation.coords.longitude, currentLocation.coords.latitude] : [0, 0]}
          animationMode={'flyTo'}
          animationDuration={0}></Mapbox.Camera>
        {currentLocation && renderAnnotations()}
      </Mapbox.MapView>
    </View>
  );
};

export default App;

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//   },
//   container: {
//     height: "100%",
//     width: "100%",
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   }
// });
