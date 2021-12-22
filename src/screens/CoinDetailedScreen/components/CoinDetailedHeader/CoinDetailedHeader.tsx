import React from 'react';
import {View, Text, Image} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import {NavigateScreenProps} from '../../../../navigation';

import styles from './styles';
import {useWatchList} from '../../../../contexts/WatchlistContext';
import COLORS from '../../../../constants/colors';

const CoinDetailedHeader = ({
  coinId,
  image,
  symbol,
  marketCapRank,
}: {
  coinId: string;
  image: string;
  symbol: string;
  marketCapRank: number;
}) => {
  const navigation = useNavigation<NavigateScreenProps>();
  const {watchListCoinsIds, storeWatchListCoinId, removeWatchListCoinId} =
    useWatchList();

  const checkIfCoinIsWatchListed = () => {
    return watchListCoinsIds.some(
      (coinIdValue: string) => coinIdValue === coinId,
    );
  };

  const handleWatchListCoin = () => {
    if (checkIfCoinIsWatchListed()) {
      return removeWatchListCoinId(coinId);
    }

    return storeWatchListCoinId(coinId);
  };

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color={COLORS.PRIMARY}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{uri: image}} style={{width: 25, height: 25}} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text
            style={{color: COLORS.PRIMARY, fontWeight: 'bold', fontSize: 15}}>
            #{marketCapRank}
          </Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfCoinIsWatchListed() ? 'star' : 'star-o'}
        size={25}
        color={checkIfCoinIsWatchListed() ? COLORS.STAR : COLORS.PRIMARY}
        onPress={handleWatchListCoin}
      />
    </View>
  );
};

export default CoinDetailedHeader;
