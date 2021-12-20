import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

const CoinItem = ({marketCoin}: any) => {
  const {
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
  } = marketCoin;

  const percentageColor =
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';

  const normalizeMarketCap = (marketCap: number) => {
    if (marketCap > 1_000_000_000_000) {
      return Math.floor(marketCap / 1_000_000_000_000) + ' T';
    }
    if (marketCap > 1_000_000_000) {
      return Math.floor(marketCap / 1_000_000_000) + ' B';
    }
    if (marketCap > 1_000_000) {
      return Math.floor(marketCap / 1_000_000) + ' M';
    }
    if (marketCap > 1_000) {
      return Math.floor(marketCap / 1_000) + ' K';
    }
  };

  return (
    <View style={styles.coinContainer}>
      <Image
        source={{
          uri: image,
        }}
        style={{width: 30, height: 30, marginRight: 10, alignSelf: 'center'}}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'}
            size={12}
            color={percentageColor}
            style={{alignSelf: 'center', marginRight: 5}}
          />
          <Text style={{color: percentageColor}}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={{marginLeft: 'auto', alignItems: 'flex-end'}}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{color: 'white'}}>
          MCap {normalizeMarketCap(market_cap)}{' '}
        </Text>
      </View>
    </View>
  );
};

export default CoinItem;
