import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useTraderStore } from '../store/useTraderStore'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const UsernameScreen = () => {
  const [name, setName] = useState('')
  const setUsername = useTraderStore((state) => state.setUsername)
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const handleContinue = () => {
    if (name.trim().length > 0) {
      setUsername(name.trim())
      navigation.replace('Main')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Trader!</Text>
      <TextInput
        placeholder="Enter your trader name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Button title="Continue" onPress={handleContinue} disabled={!name.trim()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
})
