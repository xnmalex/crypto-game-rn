import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useTraderStore } from '../store/useTraderStore'
import { SafeAreaView } from 'react-native-safe-area-context'

export const LeaderboardScreen = () => {
  const username = useTraderStore((state) => state.username)
  const transactions = useTraderStore((state) => state.transactions)
  const balance = useTraderStore((state) => state.balance)

  // Fake global traders (you can later fetch this from backend)
  const fakeTraders = [
    { username: 'Alice', balance: 6200 },
    { username: 'Bob', balance: 5900 },
    { username: 'Clara', balance: 5700 },
    { username: 'Alice', balance: 6200 },
    { username: 'Bob', balance: 5900 },
    { username: 'Clara', balance: 5700 },
    { username: 'Alice', balance: 6200 },
    { username: 'Bob', balance: 5900 },
    { username: 'Clara', balance: 5700 },
    { username: 'Alice', balance: 6200 },
    { username: 'Bob', balance: 5900 },
    { username: 'Clara', balance: 5700 },
    { username: 'Alice', balance: 6200 },
    { username: 'Bob', balance: 5900 },
    { username: 'Clara', balance: 5700 },
    { username: 'Alice', balance: 6200 },
    { username: 'Bob', balance: 5900 },
    { username: 'Clara', balance: 5700 },
  ]

  const yourScore = { username, balance }

  const sorted = [...fakeTraders, yourScore].sort((a, b) => b.balance - a.balance)

  return (
     <SafeAreaView style={{ flex: 1 }}>
        <FlatList
        data={sorted}
        keyExtractor={(item) => item.username}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
            <View
            style={[
                styles.row,
                item.username === username && styles.highlightRow,
            ]}
            >
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.name}>{item.username}</Text>
            <Text style={styles.score}>${item.balance.toFixed(2)}</Text>
            </View>
        )}
        ListHeaderComponent={
            <Text style={styles.title}>🏆 Top Traders</Text>
        }
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  highlightRow: { backgroundColor: '#cdeffc' },
  rank: { width: 40, fontWeight: 'bold' },
  name: { flex: 1 },
  score: { fontWeight: 'bold' },
})
