import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons';

type NoResultProps = {
  message?: string
}

export const NoResult = ({ message = 'No results found' }: NoResultProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={64} color="#ccc" />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    opacity: 0.7,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
})
