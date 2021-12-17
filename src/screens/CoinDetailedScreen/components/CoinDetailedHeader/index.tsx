import React from 'react';
import {View, Text, Image} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import styles from './styles';

const CoinDetailedHeader = ({
  image,
  symbol,
  marketCapRank,
}: {
  image: string;
  symbol: string;
  marketCapRank: number;
}) => {
  return (
    <View style={styles.headerContainer}>
      <Ionicons name="chevron-back-sharp" size={30} color="white" />
      <View style={styles.tickerContainer}>
        <Image source={{uri: image}} style={{width: 25, height: 25}} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            #{marketCapRank}
          </Text>
        </View>
      </View>
      <EvilIcons name="user" size={30} color={'white'} />
    </View>
  );
};

export default CoinDetailedHeader;
