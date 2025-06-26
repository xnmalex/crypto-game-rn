import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useTraderStore } from '../store/useTraderStore'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {ButtonType, ConfigButton} from '../components/ConfigButton'
import { SafeAreaView } from 'react-native-safe-area-context'

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{`Welcome,\n Trader!`}</Text>
      <View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter your trader name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.hint}>This will be visible on the leaderboard</Text>
      </View>
      
      <ConfigButton
        onPress={handleContinue}
        type={ButtonType.DEFAULT}
        title="Continue"
        disabled={!name.trim()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', padding: 20, backgroundColor:'#000' },
  title: { fontSize: 40, marginTop: 30, color:'#fff', fontWeight:'600', textAlign: 'center' },
  label: { fontSize: 18, marginBottom: 5, color:'#ddd', fontWeight:'600'},
  hint: { fontSize: 18, marginTop: 10, color:'#666', fontWeight:'600'},
  input: {
    borderWidth: 1,
    padding: 14,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor:'#111',
    fontSize:18,
    color:'#fff'
  },
})
