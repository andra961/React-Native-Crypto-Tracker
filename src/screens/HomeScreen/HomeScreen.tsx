import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';

import cryptocurrencies from '../../../assets/data/cryptocurrencies.json';

import CoinItem from '../../components/CoinItem';
import COLORS from '../../constants/colors';
import {getMarketData} from '../../services/requests';

const HomeScreen = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCoins = async (pageNumber: number) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData(pageNumber);
    setCoins(existingCoins => [...existingCoins, ...coinsData]);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins(1);
  }, []);

  return (
    <View>
      <Text
        style={{
          fontWeight: '800',
          color: COLORS.PRIMARY,
          fontSize: 25,
          letterSpacing: 1,
          paddingHorizontal: 20,
          paddingBottom: 5,
        }}>
        Cryptoassets
      </Text>
      <FlatList
        data={coins}
        renderItem={({item}) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(Math.floor(coins.length / 50 + 1))}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor={COLORS.PRIMARY}
            onRefresh={refetchCoins}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
