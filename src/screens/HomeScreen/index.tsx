import React from 'react';
import {View, Text, FlatList} from 'react-native';

import cryptocurrencies from '../../../assets/data/cryptocurrencies.json';

import CoinItem from '../../components/CoinItem';

const HomeScreen = () => {
  return (
    <FlatList
      data={cryptocurrencies}
      renderItem={({item}) => <CoinItem marketCoin={item} />}
    />
  );
};

export default HomeScreen;
