import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {IcBack} from '../../../assets';
import React from 'react';

const Header = ({title, subTitle, onBack}) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
          <View style={styles.back}>
            <IcBack />
          </View>
        </TouchableOpacity>
      )}
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 26,
    paddingTop: 30,
    paddingBottom: 24,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#11181C',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#a1a1aa',
  },
  back: {
    marginRight: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10
  },
});
