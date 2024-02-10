import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';

const Button = ({text, color = '#17c964', textColor = '#11181C', onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(color)}>
        <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: color => ({
    backgroundColor: color,
    padding: 12,
    borderRadius: 8,
  }),
  text: textColor => ({
    color: textColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
  }),
});
