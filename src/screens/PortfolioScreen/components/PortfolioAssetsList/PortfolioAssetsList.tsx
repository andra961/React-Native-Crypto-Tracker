import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

import PortfolioAssetItem from '../PortfolioAssetItem';
import {useNavigation} from '@react-navigation/native';
import {NavigateScreenProps} from '../../../../navigation/Navigation';
import {useRecoilState, useRecoilValue} from 'recoil';
import {allPortfolioAssets} from '../../../../atoms/PortfolioAssets';

//'#ea3943' : '#16c784'

const PortfolioAssetsList = () => {
  const navigation = useNavigation<NavigateScreenProps>();
  const [assets, setAssets] = useRecoilState(allPortfolioAssets);

  console.log('Assets are: ', assets);

  const isChangePositive = () => parseFloat(getCurrentValueChange()) >= 0;

  const getCurrentBalance = () =>
    assets?.reduce(
      (total: any, currentAsset: any) =>
        total + currentAsset.boughtQuantity * currentAsset.currentPrice,
      0,
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets?.reduce(
      (total: any, currentAsset: any) =>
        total + currentAsset.boughtQuantity * currentAsset.priceBought,
      0,
    );

    console.log('change:', currentBalance - boughtBalance);

    return (currentBalance - boughtBalance).toFixed(3);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets?.reduce(
      (total: any, currentAsset: any) =>
        total + currentAsset.boughtQuantity * currentAsset.priceBought,
      0,
    );

    const percentage = ((currentBalance - boughtBalance) / boughtBalance) * 100;

    console.log(percentage);

    return isNaN(percentage) ? 0 : percentage.toFixed(2);
  };

  return (
    <FlatList
      data={assets}
      renderItem={({item}) => <PortfolioAssetItem assetItem={item} />}
      ListHeaderComponent={
        <>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.currentBalance}>Current Balance</Text>
              <Text style={styles.currentBalanceValue}>
                ${getCurrentBalance().toFixed(2)}
              </Text>
              <Text
                style={{
                  ...styles.valueChange,
                  color: isChangePositive() ? '#16c784' : '#ea3943',
                }}>
                ${getCurrentValueChange()} (All Time)
              </Text>
            </View>
            <View
              style={{
                ...styles.priceChangePercentageContainer,
                backgroundColor: isChangePositive() ? '#16c784' : '#ea3943',
              }}>
              <AntDesign
                name={isChangePositive() ? 'caretup' : 'caretdown'}
                size={12}
                color={'white'}
                style={{alignSelf: 'center', marginRight: 5}}
              />
              <Text style={styles.percentageChange}>
                {getCurrentPercentageChange()}%
              </Text>
            </View>
          </View>
          <Text style={styles.assetsLabel}>Your Assets</Text>
        </>
      }
      ListFooterComponent={
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('AddNewAssetScreen')}>
          <Text style={styles.buttonText}> Add New Asset</Text>
        </Pressable>
      }
    />
  );
};

export default PortfolioAssetsList;
