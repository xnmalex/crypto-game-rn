import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Crypto {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  image: string
}

interface CryptoState {
  list: Crypto[]
  setList: (list: Crypto[]) => void
}

export const useCryptoStore = create<CryptoState>()(
  persist(
    (set) => ({
      list: [],
      setList: (list) => set({ list }),
    }),
    {
      name: 'crypto-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
