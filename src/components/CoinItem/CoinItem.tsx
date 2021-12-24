import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

import {NavigateScreenProps} from '../../navigation/Navigation';
import COLORS from '../../constants/colors';

const CoinItem = ({marketCoin}: any) => {
  const {
    id,
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
  } = marketCoin;

  const navigation = useNavigation<NavigateScreenProps>();

  const percentageColor =
    price_change_percentage_24h < 0
      ? COLORS.RED
      : COLORS.GREEN || COLORS.PRIMARY;

  const normalizeMarketCap = (marketCap: number) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12).toFixed(3)} T`;
    }
    if (marketCap > 1e9) {
      return `${(marketCap / 1e9).toFixed(3)} B`;
    }
    if (marketCap > 1e6) {
      return `${(marketCap / 1e6).toFixed(3)} M`;
    }
    if (marketCap > 1e3) {
      return `${(marketCap / 1e3).toFixed(3)} K`;
    }
  };

  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => navigation.navigate('CoinDetailedScreen', {coinId: id})}>
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
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={{marginLeft: 'auto', alignItems: 'flex-end'}}>
        <Text style={styles.title}>${current_price}</Text>
        <Text style={{color: COLORS.PRIMARY}}>
          MCap {normalizeMarketCap(market_cap)}{' '}
        </Text>
      </View>
    </Pressable>
  );
};

export default CoinItem;
