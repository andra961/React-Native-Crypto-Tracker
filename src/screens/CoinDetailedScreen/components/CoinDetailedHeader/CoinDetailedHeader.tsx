import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useNavigation} from '@react-navigation/native';
import {NavigateScreenProps} from '../../../../navigation';

import styles from './styles';
import COLORS from '../../../../constants/colors';

import {
  storeWatchListCoinId,
  removeWatchListCoinId,
} from '../../../../redux/watchlist';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../../redux/store';

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

  const dispatch = useAppDispatch();

  const {watchlistCoins, loading} = useSelector(
    (state: RootState) => state.watchlist,
  );

  const checkIfCoinIsWatchListed = () => {
    return watchlistCoins.some((coinIdValue: string) => coinIdValue === coinId);
  };

  const handleWatchListCoin = () => {
    if (checkIfCoinIsWatchListed()) {
      return dispatch(removeWatchListCoinId(coinId));
    }

    return dispatch(storeWatchListCoinId(coinId));
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-sharp" size={30} color={COLORS.PRIMARY} />
      </TouchableOpacity>

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
      <TouchableOpacity onPress={handleWatchListCoin}>
        <FontAwesome
          name={checkIfCoinIsWatchListed() ? 'star' : 'star-o'}
          size={25}
          color={checkIfCoinIsWatchListed() ? COLORS.STAR : COLORS.PRIMARY}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CoinDetailedHeader;
