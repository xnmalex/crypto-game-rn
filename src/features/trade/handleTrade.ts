import { generateTradeId } from '../../utils/generateTradeId'
import { useTraderStore } from '../../store/useTraderStore'
import { Crypto } from '../../store/useCryptoStore'

export function handleTrade(
  type: 'buy' | 'sell',
  crypto: Crypto,
  usdAmount: number
): { success: boolean; message: string } {
  const { balance, addTransaction } = useTraderStore.getState()

  if (isNaN(usdAmount) || usdAmount <= 0) return {success: true, message:'Invalid amount'}
  
  if (type === 'buy' && usdAmount > balance) {
    return {success: true, message:'Insufficient balance'}
  }
  
  const price = crypto.current_price? crypto.current_price : 0
  if (!price) return {success: false, message:'Unsupported symbol'}

  const cryptoAmount = usdAmount / crypto.current_price
  const tx = {
    id: generateTradeId(),
    type,
    symbol: crypto.symbol.toUpperCase(),
    amountUSD: usdAmount,
    amountCrypto: cryptoAmount,
    timestamp: Date.now(),
  }

  addTransaction(tx)
  return {
    success: true,
    message: `${type === 'buy' ? 'Purchased' : 'Sold'} ${tx.amountCrypto.toFixed(6)} ${tx.symbol}`,
  }
}
