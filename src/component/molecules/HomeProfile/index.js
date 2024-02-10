import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ProfileDummy} from '../../../assets';
import {getData} from '../../../utils';
import {useNavigation} from '@react-navigation/native';

const HomeProfile = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(ProfileDummy);

  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     getData('userProfile').then((res) => {
  //       setPhoto({uri: res.profile_photo_url});
  //     });
  //   });
  // }, [navigation]);

  return (
    <View style={styles.profileContainer}>
      <View>
        <Text style={styles.appName}>Geo Tagging</Text>
        <Text style={styles.desc}>Discover places Plant Tree around you</Text>
      </View>
      {/* <Image source={photo} style={styles.profile} /> */}
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  appName: {fontSize: 22, fontFamily: 'Poppins-Medium', color: '#020202'},
  desc: {fontSize: 14, fontFamily: 'Poppins-Light', color: '#8D92A3'},
  profile: {width: 50, height: 50, borderRadius: 8},
});
