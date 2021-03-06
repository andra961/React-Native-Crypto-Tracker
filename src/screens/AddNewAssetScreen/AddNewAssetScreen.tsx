import React, {Suspense, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import SearchableDropdown from 'react-native-searchable-dropdown';

import {getAllCoins, getDetaliedCoinData} from '../../services/requests';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigateScreenProps} from '../../navigation';

import uuid from 'react-native-uuid';
import COLORS from '../../constants/colors';
import {fetchBoughtAssets} from '../../redux/portfolio';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';

const AddNewAssetScreen = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [loadingCoins, setLoadingCoins] = useState<boolean>(false);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState<string>('0');
  const [selectedCoin, setSelectedCoin] = useState<any>(null);

  const dispatch = useAppDispatch();

  const {boughtAssets, loading} = useSelector(
    (state: RootState) => state.portfolio,
  );

  useEffect(() => {
    dispatch(fetchBoughtAssets());
  }, []);

  const navigation = useNavigation<NavigateScreenProps>();

  const isQuantityEntered = () =>
    boughtAssetQuantity === '' || parseFloat(boughtAssetQuantity) <= 0;

  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      unique_id: selectedCoin.id + uuid.v4(),
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      boughtQuantity: parseFloat(boughtAssetQuantity),
      priceBought: selectedCoin.market_data.current_price.usd,
    };
    const newAssets = [...boughtAssets, newAsset];

    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem('@portfolio_coins', jsonValue);
    dispatch(fetchBoughtAssets());
    navigation.goBack();
  };

  const fetchAllCoins = async () => {
    if (loadingCoins) {
      return;
    }
    setLoadingCoins(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoadingCoins(false);
  };

  const fetchCoinInfo = async () => {
    if (loadingCoins) {
      return;
    }
    setLoadingCoins(true);
    const coinInfo = await getDetaliedCoinData(selectedCoinId!);
    setSelectedCoin(coinInfo);
    setLoadingCoins(false);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }
  }, [selectedCoinId]);

  if (loading || loadingCoins || !boughtAssets)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <View style={{flex: 1}}>
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(item: any) => setSelectedCoinId(item.id)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={styles.itemText}
        resetValue={false}
        placeholder={selectedCoin?.name || 'Select a coin...'}
        placeholderTextColor={COLORS.PRIMARY}
        textInputProps={{
          underlineColorAndroid: 'transparent',
          style: styles.textInput,
        }}
      />
      {selectedCoin && (
        <>
          <View style={styles.boughtQuantityContainer}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{color: COLORS.PRIMARY, fontSize: 90, padding: 0}}
                value={boughtAssetQuantity}
                keyboardType="numeric"
                onChangeText={setBoughtAssetQuantity}
              />
              <Text style={styles.ticker}>
                {selectedCoin.symbol.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.pricePerCoin}>
              ${selectedCoin.market_data.current_price.usd} per coin
            </Text>
          </View>
          <TouchableOpacity
            style={{
              ...styles.buttonContainer,
              backgroundColor: isQuantityEntered()
                ? COLORS.GREY_DISABLED
                : COLORS.BLUE,
            }}
            onPress={onAddNewAsset}
            disabled={isQuantityEntered()}>
            <Text
              style={{
                ...styles.buttonText,
                color: isQuantityEntered()
                  ? COLORS.DEFAULT_GREY
                  : COLORS.PRIMARY,
              }}>
              Add New Asset
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AddNewAssetScreen;
