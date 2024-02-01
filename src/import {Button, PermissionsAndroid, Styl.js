import {Button, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import Geolocation from 'react-native-geolocation-service';
import Mapbox from '@rnmapbox/maps';
import { Platform } from 'react-native';

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
   // state to hold location
   // function to check permissions and get Location
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
  }, []);
  // const renderAnnotations = () => {

  //   return (
  //     <Mapbox.PointAnnotation
  //       key="pointAnnotation"
  //       id="pointAnnotation"
  //      coordinate={[currentLocation.longitude, currentLocation.latitude]}>
  //       <View
  //         style={{
  //           height: 30,
  //           width: 30,
  //           backgroundColor: '#00cccc',
  //           borderRadius: 50,
  //           borderColor: '#fff',
  //           borderWidth: 3,
  //         }}
  //       />
  //     </Mapbox.PointAnnotation>
  //   );
  // };
 return (
  <Mapbox.MapView
  style={{ flex: 1 }}
  logoEnabled={false}
  attributionEnabled={false}
  centerCoordinate={currentLocation ? [currentLocation.coords.longitude, currentLocation.coords.latitude] : [0, 0]}
  zoomLevel={currentLocation ? 12 : 1}
  styleURL={Mapbox.StyleURL.Outdoors}
>
  {currentLocation && (
    <Mapbox.PointAnnotation
      key="currentLocation"
      id="currentLocation"
      coordinate={[currentLocation.coords.longitude, currentLocation.coords.latitude]}
    >
      <Mapbox.Callout title="You are here" />
    </Mapbox.PointAnnotation>
  )}
</Mapbox.MapView>
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
