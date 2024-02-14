import {Button, Gap, HomeProfile, TextInput} from '../../component';
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import {showMessage, useForm} from '../../utils';

import DatePicker from 'react-native-date-picker';
import Geolocation from 'react-native-geolocation-service';
import Mapbox from '@rnmapbox/maps';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';

Mapbox.setAccessToken(
  'pk.eyJ1Ijoib255bWVrbm93IiwiYSI6ImNrenl5cXZndTA1MXQzY3F4bjJxeTN4NTYifQ.e7Kn2mLxCSQmBNIQVxTSPA',
);

// enablePromise(true);

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
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Error requesting location permission:', err);
    return false;
  }
};
const getDBConnection = async () => {
  return openDatabase({name: 'geotag.db', location: 'default'});
};

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [photo, setPhoto] = useState('');
  const [form, setForm] = useForm({
    longitude:  currentLocation
    ? currentLocation.coords.longitude.toString()
    : '',
    latitude: currentLocation
      ? currentLocation.coords.latitude.toString()
      : '',
    date: new Date(),
    name: '',
    jenis: '',
    tinggi: '',
    status: '',
    diameter: '',
  });



  const dispatch = useDispatch();

  useEffect(() => {
    const getLocation = async () => {
      const granted = await requestLocationPermission();
      if (granted) {
        Geolocation.getCurrentPosition(
          position => {
            setCurrentLocation(position);
          },
          error => {
            console.log(error);
            setCurrentLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission denied.');
      }
    };
    createTable();

    getLocation();
  }, []);

  // const getDataTable = async () => {
  //   const db = await getDBConnection();
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM tanaman;', [], (tx, results) => {
  //       const rows = results.rows;
  //       let users = [];

  //       for (let i = 0; i < rows.length; i++) {
  //         users.push({
  //           ...rows.item(i),
  //         });
  //       }

  //       // setData(users);
  //       console.log(users);
  //     });
  //   });
  // };

  const createTable = async () => {
    const query_create = `CREATE TABLE IF NOT EXISTS tanamans(
        id INTEGER PRIMARY KEY AUTOINCREMENT,longitude TEXT NOT NULL,
        latitude TEXT NOT NULL,name TEXT NOT NULL, date TEXT NOT NULL, jenis TEXT NOT NULL,
        tinggi TEXT NOT NULL,status TEXT NOT NULL, diameter TEXT NOT NULL, 
        file_path TEXT NOT NULL
    );`;
    try {
      const db = await getDBConnection();
      await db.executeSql(query_create);
    } catch (err) {
      console.log({err});
    }
  };

  const insertTable = async () => {
    const query = `INSERT INTO tanamans (longitude, latitude, name, date, jenis, tinggi, status, diameter, file_path) VALUES (?,?,?,?,?,?,?,?,?);`;
    try {
      const db = await getDBConnection();
      await db.executeSql(query, [
        currentLocation.coords.longitude.toString(),
        currentLocation.coords.latitude.toString(),
        form.name.toString(),
        form.date.toString(),
        form.jenis.toString(),
        form.tinggi.toString(),
        form.status.toString(),
        form.diameter.toString(),
        photo ? photo.uri.toString() : ''
      ]);
    } catch (error) {
      console.error(error);
      throw Error(`Failed to insert data into table tanamans`);
    }
  };

  const removeTable = async () => {
    const query = `DROP TABLE IF EXISTS tanamans`;
    try {
      const db = await getDBConnection();
      await db.executeSql(query);
    } catch (error) {
      console.error(error);
      throw Error(`Failed to drop table tanamans`);
    }
  };

  // console.log(data);

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

  const addPhoto = () => {
    launchImageLibrary(
      {
        // quality: 0.5,
        // maxWidth: 200,
        // maxHeight: 200,
      },
      response => {
        if (response.didCancel || response.error) {
          showMessage('Anda tidak memilih photo');
        } else {
          const source = {uri: response.assets[0].uri};
          const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };

          setPhoto(source);
          console.log(source);
          // dispatch({type: 'SET_PHOTO', value: dataImage});
          // dispatch({type: 'SET_UPLOAD_STATUS', value: true});
        }
      },
    );
  };

  // const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.page}>
        <HomeProfile />
        <View style={styles.container}>
          <View style={styles.photo}>
            <TouchableOpacity onPress={addPhoto}>
              <View style={styles.borderPhoto}>
                {photo ? (
                  <Image source={photo} style={styles.photoContainer} />
                ) : (
                  <View style={styles.photoContainer}>
                    <Text style={styles.addPhoto}>Add Photo</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          {/* <Button text="Create Table" textColor="#fff" onPress={createTable} />
          <Gap height={16} /> */}
          {/* <Button text="Remove Table" textColor="#fff" onPress={removeTable} /> */}
          {/* <Gap height={16} /> */}
          <TouchableOpacity onPress={() => setOpen(true)}>
            <TextInput
              label="Tanggal"
              editable={false}
              value={form.date.toDateString()} // Display the selected date as text
            />
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={form.date}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setForm('date', date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Gap height={16} />
          <TextInput
            label="Nama Tanaman"
            placeholder="Type your nama tanaman"
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Jenis Tanaman"
            placeholder="Type your jenis tanaman"
            value={form.jenis}
            onChangeText={value => setForm('jenis', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Diameter"
            placeholder="Type your diameter"
            value={form.diameter}
            onChangeText={value => setForm('diameter', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Tinggi"
            placeholder="Type your tinggi"
            value={form.tinggi}
            onChangeText={value => setForm('tinggi', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Status"
            placeholder="Type your status"
            value={form.status}
            onChangeText={value => setForm('status', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Latitude"
            placeholder="Type your latitude"
            editable={false}
            value={
              currentLocation ? currentLocation.coords.latitude.toString() : ''
            }
            onChangeText={value => setForm('latitude', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Longtitude"
            placeholder="Type your longtitude"
            editable={false}
            value={
              currentLocation ? currentLocation.coords.longitude.toString() : ''
            }
            onChangeText={value => setForm('longitude', value)}
          />
          <Gap height={16} />
          <View style={{flex: 1, height: 300, width: '100%'}}>
            <Mapbox.MapView
              styleURL={Mapbox.StyleURL.Street}
              zoomLevel={15}
              centerCoordinate={
                currentLocation
                  ? [
                      currentLocation.coords.longitude,
                      currentLocation.coords.latitude,
                    ]
                  : [0, 0]
              }
              style={{flex: 1}}>
              <Mapbox.Camera
                zoomLevel={16}
                centerCoordinate={
                  currentLocation
                    ? [
                        currentLocation.coords.longitude,
                        currentLocation.coords.latitude,
                      ]
                    : [0, 0]
                }
                animationMode={'flyTo'}
                animationDuration={1}
              />
              {currentLocation && renderAnnotations()}
            </Mapbox.MapView>
          </View>
          <Gap height={24} />
          <Button text="Submit" textColor="#fff" onPress={insertTable} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scroll: {flexGrow: 1},
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 16,
    flex: 1,
  },
  search: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    // marginBottom: 16,
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 345,
    height: 250,
    borderRadius: 16,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 315,
    height: 225,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
});
