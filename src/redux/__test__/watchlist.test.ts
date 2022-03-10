import store from '../store';
import {
  storeWatchListCoinId,
  removeWatchListCoinId,
  fetchWatchListCoinIds,
} from '../watchlist';

import AsyncStorage from '@react-native-async-storage/async-storage';

const [testId1, testId2, testId3, testId4] = ['1', '2', '3', '4'];

describe('Portfolio slice test', () => {
  it('should be empty', () => {
    const watchlist = store.getState().watchlist;

    expect(watchlist?.loading).toBe(true);

    expect(watchlist?.watchlistCoins).toStrictEqual([]);
  });

  it('should store coin id', async () => {
    await store.dispatch(storeWatchListCoinId(testId1));

    const watchlist = store.getState().watchlist;

    expect(watchlist?.watchlistCoins).toStrictEqual(['1']);
  });

  it('should save in async storage', async () => {
    const watchlist = store.getState().watchlist;

    await store.dispatch(storeWatchListCoinId(testId2));

    expect(AsyncStorage.setItem).toBeCalledWith(
      '@watchlist_coins',
      JSON.stringify([...watchlist.watchlistCoins, testId2]),
    );
  });

  it('should fetch from async storage', async () => {
    await store.dispatch(fetchWatchListCoinIds());

    expect(AsyncStorage.getItem).toBeCalledWith('@watchlist_coins');

    const watchlist = store.getState().watchlist;

    expect(watchlist?.watchlistCoins).toStrictEqual([testId1, testId2]);
  });

  it('should remove coin id from state and async storage', async () => {
    await store.dispatch(removeWatchListCoinId(testId1));

    expect(AsyncStorage.setItem).toBeCalledWith(
      '@watchlist_coins',
      JSON.stringify([testId2]),
    );

    const watchlist = store.getState().watchlist;

    expect(watchlist?.watchlistCoins).toStrictEqual([testId2]);
  });
});
