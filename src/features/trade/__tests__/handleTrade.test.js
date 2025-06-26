import { handleTrade } from '../handleTrade';
import { useTraderStore } from '../../../store/useTraderStore';
import { act } from '@testing-library/react-native';

beforeEach(() => {
  useTraderStore.getState().reset(); // Reset Zustand store before each test
});

const mockCrypto = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  current_price: 50000,
  price_change_percentage_24h: 2.5,
  image: '',
};

describe('handleTrade', () => {
  it('should add a buy transaction and decrease balance', () => {
    const initialBalance = useTraderStore.getState().balance;

    act(() => {
      handleTrade('buy', mockCrypto, 1000);
    });

    const state = useTraderStore.getState();
    const tx = state.transactions[0];

    expect(tx.type).toBe('buy');
    expect(tx.symbol).toBe('BTC');
    expect(tx.amountUSD).toBe(1000);
    expect(tx.amountCrypto).toBeCloseTo(1000 / 50000);
    expect(state.balance).toBeCloseTo(initialBalance - 1000);
  });

  it('should add a sell transaction and increase balance', () => {
    const initialBalance = useTraderStore.getState().balance;

    act(() => {
      handleTrade('sell', mockCrypto, 500);
    });

    const state = useTraderStore.getState();
    const tx = state.transactions[0];

    expect(tx.type).toBe('sell');
    expect(tx.amountUSD).toBe(500);
    expect(state.balance).toBeCloseTo(initialBalance + 500);
  });

  it('should generate unique id and timestamp', () => {
    act(() => {
      handleTrade('buy', mockCrypto, 100);
    });

    const tx = useTraderStore.getState().transactions[0];
    expect(tx.id).toMatch(/^trade-\d{17}-[a-z0-9]{6}$/);
    expect(typeof tx.timestamp).toBe('number');
  });
});
