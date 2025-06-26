import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { useTraderStore } from '../store/useTraderStore'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ButtonType, ConfigButton } from '../components/ConfigButton'
import { useCryptoStore } from '../store/useCryptoStore'
import { Picker } from '@react-native-picker/picker'
import { handleTrade } from '../features/trade/handleTrade'

export const TradeScreen = () => {
  const [usdAmount, setUsdAmount] = useState('')
  const [action, setAction] = useState<'buy' | 'sell' >('buy')

  const balance = useTraderStore((state) => state.balance)
  const addTransaction = useTraderStore((state) => state.addTransaction)

  const { list } = useCryptoStore()
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>(
    list[0]?.symbol // default to first
  )

  const selectedCrypto = list.find((c) => c.symbol === selectedSymbol)

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor:'#000' }}>
        <View style={styles.container}>
        <Text style={styles.header}>Trade</Text>

        <Text style={styles.label}>Crypto Symbol (BTC, ETH, SOL)</Text>
        <Picker
          selectedValue={selectedSymbol}
          onValueChange={(itemValue) => setSelectedSymbol(itemValue)}
          style={styles.picker}
        >
          {list.map((crypto) => (
            <Picker.Item
              key={crypto.id}
              label={`${crypto.name} (${crypto.symbol.toUpperCase()})`}
              value={crypto.symbol}
            />
          ))}
        </Picker>

        {selectedCrypto && (
          <View style={styles.infoBox}>
            <Text style={styles.price}>
              Price: ${selectedCrypto.current_price.toFixed(2)}
            </Text>
            <Text
              style={{
                color: selectedCrypto.price_change_percentage_24h >= 0 ? 'green' : 'red',
              }}
            >
              24h Change: {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
        )}


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
          onPress={()=>{
            if(selectedCrypto){
              const result = handleTrade(action, selectedCrypto, parseFloat(usdAmount))
              Alert.alert(result.message)
              setUsdAmount('')
            }
          }}
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
  balance: { marginTop: 20, fontStyle: 'italic', color:'#fff' },
  picker: {
    backgroundColor: '#1e1e1e',
    color:'#fff',
    borderRadius: 24,
    marginTop:10
  },
  infoBox: { marginTop: 16 },
  price: { fontSize: 18,color:'#fff', fontWeight: 'bold' },
})
