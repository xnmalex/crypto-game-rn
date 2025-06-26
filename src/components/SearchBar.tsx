import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons';

type SearchBarProps = {
  value: string
  onChange: (text: string) => void
  placeholder?: string
}

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingHorizontal: 10,
    paddingVertical:5,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal:16
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
    color:'#fff'
  },
})
