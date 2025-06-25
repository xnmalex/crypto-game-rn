import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

const mockData = [
  { symbol: 'BTC', name: 'Bitcoin', price: 64000, change: 1.2 },
  { symbol: 'ETH', name: 'Ethereum', price: 3400, change: -0.5 },
  { symbol: 'SOL', name: 'Solana', price: 145, change: 2.1 },
]

export const CryptoListScreen = () => {
  return (
    <FlatList
      data={mockData}
      keyExtractor={(item) => item.symbol}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <Text style={{ color: item.change >= 0 ? 'green' : 'red' }}>
              {item.change >= 0 ? '+' : ''}
              {item.change}%
            </Text>
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f3f3f3',
    marginBottom: 12,
  },
  symbol: { fontSize: 18, fontWeight: 'bold' },
  name: { color: '#777' },
  price: { fontSize: 16, fontWeight: 'bold' },
})
