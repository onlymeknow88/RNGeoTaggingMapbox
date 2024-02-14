import { StyleSheet, Text, TextInput as TextInputRN, View } from 'react-native'

import React from 'react'

const TextSearch = ({placeholder, ...restProps}) => {
  return (
    <View>
     <TextInputRN
        style={styles.input}
        placeholder={placeholder}
        {...restProps}
      />
    </View>
  )
}

export default TextSearch

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#a1a1aa',
        borderRadius: 8,
        padding: 10,
      },
})