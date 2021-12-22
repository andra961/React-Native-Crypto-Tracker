import React, {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistContext = createContext<any>(null);

export const useWatchList = () => useContext(WatchlistContext);

const WatchlistProvider = ({children}: any) => {
  const [watchListCoinsIds, setWatchListCoinsIds] = useState<string[]>([]);

  const getWatchListCoinId = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@watchlist_coins');
      setWatchListCoinsIds(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e: any) {
      console.log(e.msg || e);
    }
  };

  useEffect(() => {
    getWatchListCoinId();
  }, []);

  const storeWatchListCoinId = async (coinId: string) => {
    try {
      const newWatchList = [...watchListCoinsIds, coinId];
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem('@watchlist_coins', jsonValue);
      setWatchListCoinsIds(newWatchList);
    } catch (e: any) {
      console.log(e.msg || e);
    }
  };

  const removeWatchListCoinId = async (coinId: string) => {
    const newWatchList = watchListCoinsIds.filter(id => id !== coinId);
    const jsonValue = JSON.stringify(newWatchList);
    await AsyncStorage.setItem('@watchlist_coins', jsonValue);
    setWatchListCoinsIds(newWatchList);
  };

  return (
    <WatchlistContext.Provider
      value={{watchListCoinsIds, storeWatchListCoinId, removeWatchListCoinId}}>
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
