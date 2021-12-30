import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import CoinItem from '../../components/CoinItem';

import {fetchWatchListCoinIds} from '../../redux/watchlist';

import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';

import {getWatchListedCoins} from '../../services/requests';
import COLORS from '../../constants/colors';

const WatchListScreen = () => {
  const dispatch = useDispatch();

  const {watchlistCoins, loading} = useSelector(
    (state: RootState) => state.watchlist,
  );

  useEffect(() => {
    dispatch(fetchWatchListCoinIds());
  }, []);

  const [coins, setCoins] = useState<any[]>([]);
  const [loadingCoins, setLoadingCoins] = useState<boolean>(false);

  const transformCoinsIds = () => {
    return watchlistCoins.join('%2C');
  };
  const fetchWatchListedCoins = async () => {
    if (loadingCoins) {
      return;
    }
    setLoadingCoins(true);
    const watchListedCoinsData = await getWatchListedCoins(transformCoinsIds());

    setCoins(watchListedCoinsData);
    setLoadingCoins(false);
  };

  useEffect(() => {
    if (watchlistCoins.length > 0) {
      fetchWatchListedCoins();
    } else {
      setCoins([]);
    }
  }, [watchlistCoins]);

  if (loading || loadingCoins || !coins)
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
              refreshing={loadingCoins}
              tintColor={COLORS.PRIMARY}
              onRefresh={fetchWatchListedCoins}
            />
          }
        />
      )}
    />
  );
};

export default WatchListScreen;
