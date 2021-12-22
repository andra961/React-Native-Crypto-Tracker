import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useWatchList} from '../../contexts/WatchlistContext';

import CoinItem from '../../components/CoinItem';

import {getWatchListedCoins} from '../../services/requests';

const WatchListScreen = () => {
  const {watchListCoinsIds} = useWatchList();

  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const transformCoinsIds = () => {
    return watchListCoinsIds.join('%2C');
  };
  const fetchWatchListedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchListedCoinsData = transformCoinsIds()
      ? await getWatchListedCoins(transformCoinsIds())
      : [];
    setCoins(existingCoins => [/*...existingCoins*/ ...watchListedCoinsData]);
    console.log('saved coins', watchListedCoinsData);
    console.log('coins in state', coins);
    setLoading(false);
  };

  useEffect(() => {
    fetchWatchListedCoins();
  }, [watchListCoinsIds]);

  if (loading || !coins)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <FlatList
      data={coins}
      renderItem={({item}: any) => (
        <CoinItem
          marketCoin={item}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              tintColor="white"
              onRefresh={fetchWatchListedCoins}
            />
          }
        />
      )}
    />
  );
};

export default WatchListScreen;
