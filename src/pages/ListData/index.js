import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

import {Header} from '../../component';
import {ScrollView} from 'react-native-gesture-handler';

const getDBConnection = async () => {
  return openDatabase({name: 'geotag.db', location: 'default'});
};

const ListData = () => {
  const [data, setData] = useState([]);

  const getDataTable = async () => {
    const db = await getDBConnection();
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM tanamans;', [], (tx, results) => {
        const rows = results.rows;
        let tanamans = [];

        for (let i = 0; i < rows.length; i++) {
          tanamans.push({
            ...rows.item(i),
          });
        }

        setData(tanamans);
        // console.log(tanamans);
      });
    });
  };

  useEffect(() => {
    getDataTable();
  });
  return (
    <View style={styles.page}>
      <Header
        title="List Data Tanaman"
        subTitle="Adaro Minerals Indonesia"
        // onBack={() => navigation.navigate('SignIn')}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {data.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.photo}>
                <View style={styles.borderPhoto}>
                  {item.file_path === ''  ? (
                    <View style={styles.photoContainer}>
                      <Text style={styles.image}>Photo</Text>
                    </View>
                  ) : (
                    <Image
                      source={item.file_path ? {uri: item.file_path} : ''}
                      style={styles.photoContainer}
                    />
                  )}
                </View>
              </View>
              <View style={styles.content}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.subText}>{item.jenis}</Text>
                <View style={styles.row}>
                  <View style={styles.status}>
                    <Text style={styles.statusContent}>{item.status}</Text>
                  </View>
                </View>
                {/* <Text>Latitude: {item.latitude}</Text>
                  <Text>Longitude: {item.longitude}</Text> */}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListData;

const styles = StyleSheet.create({
  scroll: {flexGrow: 1},
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  card: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  content: {
    width: 200,
    padding: 12,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#11181C',
  },
  subText: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: '#7A7886',
    marginBottom: 2,
  },
  row: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  status: {
    backgroundColor: '#17c964',
    borderRadius: 50,
    paddingVertical: 2,
    paddingHorizontal: 14,
  },
  statusContent: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: 'white',
  },
  photo: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 100,
    height: 100,
    borderRadius: 14,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  // image: {
  //   fontSize: 14,
  //   fontFamily: 'Poppins-Light',
  //   color: '#8D92A3',
  //   textAlign: 'center',
  // },
});
