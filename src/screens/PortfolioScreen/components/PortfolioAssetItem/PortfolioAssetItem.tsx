import React from 'react';
import {View, Text, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../../../constants/colors';

import styles from './styles';

const PortfolioAssetItem = ({assetItem}: any) => {
  const {
    currentPrice,
    image,
    name,
    priceBought,
    priceChangePercentage,
    boughtQuantity,
    ticker,
  } = assetItem;

  const isChangePositive = () => priceChangePercentage >= 0;

  const renderHoldings = () => (boughtQuantity * currentPrice).toFixed(2);

  return (
    <View style={styles.coinContainer}>
      <Image
        source={{uri: image}}
        style={{height: 30, width: 30, marginRight: 10, alignSelf: 'center'}}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.ticker}>{ticker}</Text>
      </View>
      <View style={{marginLeft: 'auto', alignItems: 'flex-end'}}>
        <Text style={styles.title}>${currentPrice.toFixed(4)}</Text>
        <View style={{flexDirection: 'row'}}>
          <AntDesign
            name={isChangePositive() ? 'caretup' : 'caretdown'}
            size={12}
            color={isChangePositive() ? COLORS.GREEN : COLORS.RED}
            style={{alignSelf: 'center', marginRight: 5}}
          />
          <Text
            style={{
              color: isChangePositive() ? COLORS.GREEN : COLORS.RED,
              fontWeight: '600',
            }}>
            {priceChangePercentage?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.title}>${renderHoldings()}</Text>
        <Text style={styles.ticker}>
          {boughtQuantity} {ticker}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioAssetItem;
