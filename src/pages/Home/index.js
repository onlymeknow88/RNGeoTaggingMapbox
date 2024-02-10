import {
  Button,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Geolocation from 'react-native-geolocation-service';
import {HomeProfile} from '../../component';
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
    // console.log('granted', granted);
    if (granted === 'granted') {
      // console.log('You can use Geolocation');
      return true;
    } else {
      // console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState({
    coords: {
      latitude: '-1.224069',
      longitude: '116.8685289',
    },
  });

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
    // getLocation();
  });
  // console.log(currentLocation.coords.latitude);
  const renderAnnotations = () => {
    return (
      <Mapbox.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={[
          currentLocation.coords.longitude,
          currentLocation.coords.latitude,
        ]}>
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
    <ScrollView>
      <View>
        <HomeProfile />
      </View>
      {/* <Text>{currentLocation.coords.latitude}</Text> */}
      <View style={{flex: 1, height: 300, width: 300}}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[
            currentLocation.coords.longitude,
            currentLocation.coords.latitude,
          ]}
          style={{flex: 1}}>
          <Mapbox.Camera
            zoomLevel={15}
            centerCoordinate={[
              currentLocation.coords.longitude,
              currentLocation.coords.latitude,
            ]}
            animationMode={'flyTo'}
            animationDuration={1}
          />
          {currentLocation && renderAnnotations()}
        </Mapbox.MapView>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: 300,
    width: '100%',
  },
  map: {
    flex: 1,
  },
});
