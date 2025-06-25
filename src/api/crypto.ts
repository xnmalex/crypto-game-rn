import { api } from './client'
import { Crypto } from './types'

export async function fetchCryptoList(limit = 50) {
  const res = await api.get<Crypto[]>('/coins/markets', {
    params: {
      vs_currency: 'usd',
      per_page: limit,
      page: 1,
    },
  })
  return res.data
}