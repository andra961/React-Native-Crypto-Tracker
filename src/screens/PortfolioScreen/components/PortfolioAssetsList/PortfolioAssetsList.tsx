import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

import PortfolioAssetItem from '../PortfolioAssetItem';
import {useNavigation} from '@react-navigation/native';
import {NavigateScreenProps} from '../../../../navigation/Navigation';

import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../../redux/store';
import {fetchBoughtAssets} from '../../../../redux/portfolio';

import {SwipeListView} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../../../constants/colors';

const PortfolioAssetsList = () => {
  const navigation = useNavigation<NavigateScreenProps>();

  const dispatch = useAppDispatch();

  const {boughtAssets, loading} = useSelector(
    (state: RootState) => state.portfolio,
  );

  useEffect(() => {
    dispatch(fetchBoughtAssets());
  }, []);

  if (loading || !boughtAssets)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  const isChangePositive = () => parseFloat(getCurrentValueChange()) >= 0;

  const getCurrentBalance = () =>
    boughtAssets?.reduce(
      (total: any, currentAsset: any) =>
        total + currentAsset.boughtQuantity * currentAsset.currentPrice,
      0,
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = boughtAssets?.reduce(
      (total: any, currentAsset: any) =>
        total + currentAsset.boughtQuantity * currentAsset.priceBought,
      0,
    );

    return (currentBalance - boughtBalance).toFixed(3);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = boughtAssets?.reduce(
      (total: any, currentAsset: any) =>
        total + currentAsset.boughtQuantity * currentAsset.priceBought,
      0,
    );

    const percentage = ((currentBalance - boughtBalance) / boughtBalance) * 100;

    return isNaN(percentage) ? 0 : percentage.toFixed(2);
  };

  const onDeleteAsset = async (asset: any) => {
    const newAssets = boughtAssets.filter(
      (coin, index) => coin.unique_id !== asset.item.unique_id,
    );
    const jsonValue = JSON.stringify(newAssets);

    await AsyncStorage.setItem('@portfolio_coins', jsonValue);
    dispatch(fetchBoughtAssets());
  };

  const renderDeleteButton = (data: any) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: COLORS.RED,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: 30,
          marginLeft: 20,
        }}
        onPress={() => onDeleteAsset(data)}>
        <FontAwesome name="trash-o" size={24} color={COLORS.PRIMARY} />
      </TouchableOpacity>
    );
  };

  return (
    <SwipeListView
      data={boughtAssets}
      renderItem={({item}) => <PortfolioAssetItem assetItem={item} />}
      rightOpenValue={-75}
      disableRightSwipe
      renderHiddenItem={data => renderDeleteButton(data)}
      keyExtractor={({id}, index) => `${id}${index}`}
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
                  color: isChangePositive() ? COLORS.GREEN : COLORS.RED,
                }}>
                ${getCurrentValueChange()} (All Time)
              </Text>
            </View>
            <View
              style={{
                ...styles.priceChangePercentageContainer,
                backgroundColor: isChangePositive() ? COLORS.GREEN : COLORS.RED,
              }}>
              <AntDesign
                name={isChangePositive() ? 'caretup' : 'caretdown'}
                size={12}
                color={COLORS.PRIMARY}
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
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('AddNewAssetScreen')}>
          <Text style={styles.buttonText}> Add New Asset</Text>
        </TouchableOpacity>
      }
    />
  );
};

export default PortfolioAssetsList;
