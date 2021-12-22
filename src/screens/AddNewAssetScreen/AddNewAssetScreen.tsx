import React, {Suspense, useEffect, useState} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';

import SearchableDropdown from 'react-native-searchable-dropdown';
import {useRecoilState} from 'recoil';
import {allPortfolioBoughtAssetsInStorage} from '../../atoms/PortfolioAssets';
import {getAllCoins, getDetaliedCoinData} from '../../services/requests';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {NavigateScreenProps} from '../../navigation';
import COLORS from '../../constants/colors';

const AddNewAssetScreen = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState<string>('0');
  const [selectedCoin, setSelectedCoin] = useState<any>(null);

  const [assetsInStorage, setAssetsInStorage] = useRecoilState<any>(
    allPortfolioBoughtAssetsInStorage,
  );

  const navigation = useNavigation<NavigateScreenProps>();

  const isQuantityEntered = () => boughtAssetQuantity === '';

  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      boughtQuantity: parseFloat(boughtAssetQuantity),
      priceBought: selectedCoin.market_data.current_price.usd,
    };
    const newAssets = [...assetsInStorage, newAsset];

    console.log(newAssets);
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem('@portfolio_coins', jsonValue);
    setAssetsInStorage(newAssets);
    navigation.goBack();
  };

  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoading(false);
  };

  const fetchCoinInfo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getDetaliedCoinData(selectedCoinId!);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }

    console.log('Selected coin is:', selectedCoinId);
  }, [selectedCoinId]);

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
          <Pressable
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
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AddNewAssetScreen;
