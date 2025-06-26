import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { useTraderStore } from '../store/useTraderStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ButtonType, ConfigButton } from '../components/ConfigButton'
import { generateTradeId } from '../utils/generateTradeId'
import { useCryptoStore } from '../store/useCryptoStore'

export const TradeScreen = () => {
  const [symbol, setSymbol] = useState('BTC')
  const [usdAmount, setUsdAmount] = useState('')
  const [action, setAction] = useState<'buy' | 'sell' >('buy')

  const balance = useTraderStore((state) => state.balance)
  const addTransaction = useTraderStore((state) => state.addTransaction)

  const prices: Record<string, number> = {
    BTC: 64000,
    ETH: 3400,
    SOL: 145,
  }

  const { list, setList } = useCryptoStore()

  useEffect(() => {
    
  }, [list])

  const handleTrade = () => {
    const usd = parseFloat(usdAmount)
    if (isNaN(usd) || usd <= 0) return Alert.alert('Invalid amount')

    if (action === 'buy' && usd > balance) {
      return Alert.alert('Insufficient balance')
    }

    const price = prices[symbol.toUpperCase()]
    if (!price) return Alert.alert('Unsupported symbol')

    const tx = {
      id: generateTradeId(),
      type: action,
      symbol: symbol.toUpperCase(),
      amountUSD: usd,
      amountCrypto: usd / price,
      timestamp: Date.now(),
    }

    addTransaction(tx)
    Alert.alert(`${action === 'buy' ? 'Purchased' : 'Sold'} ${tx.amountCrypto.toFixed(6)} ${tx.symbol}`)
    setUsdAmount('')
  }

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor:'#000' }}>
        <View style={styles.container}>
        <Text style={styles.header}>Trade</Text>

        <Text style={styles.label}>Crypto Symbol (BTC, ETH, SOL)</Text>
        <TextInput
            value={symbol}
            onChangeText={setSymbol}
            style={styles.input}
            autoCapitalize="characters"
        />

        <Text style={styles.label}>USD Amount</Text>
        <TextInput
            value={usdAmount}
            onChangeText={setUsdAmount}
            keyboardType="numeric"
            style={styles.input}
        />

        <View style={styles.buttonGroup}>
            <TouchableOpacity
                style={[
                    styles.button,
                    action === 'buy' ? styles.buyActive : styles.inactive
                ]}
                onPress={() => setAction('buy')}
            >   
                <Text style={styles.text}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.button,
                    action === 'sell' ? styles.sellActive : styles.inactive
                ]}
                onPress={() => setAction('sell')}
            >
                <Text style={styles.text}>Sell</Text>
            </TouchableOpacity>
        </View>

        <ConfigButton
          type={ButtonType.DEFAULT}
          disabled={!usdAmount.trim()}
          onPress={handleTrade}
        />
        <Text style={styles.balance}>Current Balance: ${balance.toFixed(2)}</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, color:'#fff', fontWeight: 'bold', marginBottom: 20 },
  label: { marginTop: 10, color:'#fff', fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
    color:'#fff',
    fontSize:16
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    gap:16
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    height: 48,
  },
  
  text: { color: 'white', fontSize:15, fontWeight: 'bold' },
  buyActive: { backgroundColor: 'green' },
  sellActive: { backgroundColor: 'red' },
  inactive: { backgroundColor: 'gray' },
  balance: { marginTop: 20, fontStyle: 'italic' },
})
