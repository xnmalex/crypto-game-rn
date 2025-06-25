import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Transaction {
  id: string
  type: 'buy' | 'sell'
  symbol: string
  amountUSD: number
  amountCrypto: number
  timestamp: number
}

interface TraderState {
  username: string
  balance: number
  transactions: Transaction[]
  setUsername: (name: string) => void
  addTransaction: (tx: Transaction) => void
  reset: () => void
}

export const useTraderStore = create(
  persist<TraderState>(
    (set, get) => ({
      username: '',
      balance: 5000,
      transactions: [],

      setUsername: (username) => set({ username }),

      addTransaction: (tx) =>
        set((state) => ({
          transactions: [...state.transactions, tx],
          balance:
            tx.type === 'buy'
              ? state.balance - tx.amountUSD
              : state.balance + tx.amountUSD,
        })),

      reset: () => set({ username: '', balance: 5000, transactions: [] }),
    }),
    {
      name: 'trader-store', // unique key for storage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
