import React from 'react';
import {View, Text, Image} from 'react-native';
import Coin from '../../../assets/data/crypto.json';
import CoinDetailedHeader from './components/CoinDetailedHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

const CoinDetailedScreen = () => {
  const {
    image: {small},
    name,
    symbol,
    market_data: {market_cap_rank, current_price, price_change_percentage_24h},
  } = Coin;

  const percentageColor =
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784';

  return (
    <View style={{paddingHorizontal: 10}}>
      <CoinDetailedHeader
        image={small}
        symbol={symbol}
        marketCapRank={market_cap_rank}
      />
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.currentPrice}>${current_price.usd}</Text>
        </View>
        <View
          style={{
            backgroundColor: percentageColor,
            paddingHorizontal: 3,
            paddingVertical: 8,
            borderRadius: 5,
            flexDirection: 'row',
          }}>
          <AntDesign
            name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'}
            size={12}
            color={'white'}
            style={{alignSelf: 'center', marginRight: 5}}
          />
          <Text style={styles.priceChange}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CoinDetailedScreen;
