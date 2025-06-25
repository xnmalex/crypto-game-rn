import React from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Button,
  Alert,
} from 'react-native'
import { useTraderStore } from '../store/useTraderStore'
import dayjs from 'dayjs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { Avatar } from '../components/Avatar'
import { SafeAreaView } from 'react-native-safe-area-context'

export const ProfileScreen = () => {
  const { username, transactions, reset } = useTraderStore()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const createdAt = transactions.length
    ? dayjs(transactions[0].timestamp).format('MMM D, YYYY')
    : 'Today'

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          reset()
          navigation.reset({
            index: 0,
            routes: [{ name: 'Username' }],
          })
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profile}>
        <Avatar username={username} size={96} />
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.since}>Trader since {createdAt}</Text>
      </View>

      {/* Logout Button */}
      <View style={{ marginBottom: 24 }}>
        <Button title="Log out" color="#d9534f" onPress={handleLogout} />
      </View>

      {/* Transaction History */}
      <Text style={styles.sectionTitle}>Transaction History</Text>
      {transactions.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#888' }}>
          No transactions yet.
        </Text>
      ) : (
        <FlatList
          data={[...transactions].reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.txItem}>
              <Text style={{ fontWeight: 'bold' }}>
                {item.type.toUpperCase()} {item.symbol}
              </Text>
              <Text>
                ${item.amountUSD.toFixed(2)} →{' '}
                {item.amountCrypto.toFixed(6)} {item.symbol}
              </Text>
              <Text style={{ fontSize: 12, color: '#666' }}>
                {dayjs(item.timestamp).format('MMM D, YYYY h:mm A')}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  profile: { alignItems: 'center', marginBottom: 24 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  name: { fontSize: 22, fontWeight: 'bold' },
  since: { color: '#666' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 4,
  },
  txItem: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
})
