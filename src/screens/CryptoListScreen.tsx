import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from '../components/SearchBar'
import { NoResult } from '../components/NoResult'
import { useCryptoStore } from '../store/useCryptoStore'
import { fetchCryptoList } from '../api'

// const allCryptos  = [
//   { symbol: 'BTC', name: 'Bitcoin', price: 64000, change: 1.2 },
//   { symbol: 'ETH', name: 'Ethereum', price: 3400, change: -0.5 },
//   { symbol: 'SOL', name: 'Solana', price: 145, change: 2.1 },
//   { symbol: 'ADA', name: 'Cardano', price: 0.39, change: 0.4 },
//   { symbol: 'XRP', name: 'Ripple', price: 0.63, change: -0.8 },
//   { symbol: 'DOGE', name: 'Dogecoin', price: 0.13, change: 4.1 },
// ]

export const CryptoListScreen = () => {
  const { list, setList } = useCryptoStore()
  const [filtered, setFiltered] = useState(list)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(list)
    } else {
      const lower = search.toLowerCase()
      setFiltered(
        list.filter(
          (item) =>
            item.symbol.toLowerCase().includes(lower) ||
            item.name.toLowerCase().includes(lower)
        )
      )
    }
  }, [search, list])

  const loadRemote = async () => {
    setLoading(true)
    try {
      const data = await fetchCryptoList()
      setList(data)
    } catch (e) {
      console.error('Failed to fetch remote crypto list', e)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (list.length === 0) {
      loadRemote()
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <SearchBar value={search} onChange={setSearch} placeholder="Search crypto..." />
    {
      loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ): filtered.length === 0 ? (
        <NoResult message={`No cryptocurrencies match "${search}"`} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.symbol}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.price}>${item.price_change_24h? item.price_change_24h.toFixed(2): 0}</Text>
                <Text style={{ color: item.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
                  {item.price_change_percentage_24h >= 0 ? '+' : ''}
                  {item.price_change_percentage_24h}%
                </Text>
              </View>
            </View>
          )}
        />
    )}
    </SafeAreaView>
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
  symbol: { fontSize: 18, fontWeight: 'bold', textTransform:'uppercase' },
  name: { color: '#777' },
  price: { fontSize: 16, fontWeight: 'bold' },
})
