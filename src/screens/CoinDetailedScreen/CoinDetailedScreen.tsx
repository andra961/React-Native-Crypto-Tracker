import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {fetchWatchListCoinIds} from '../../redux/watchlist';
import CoinDetailedHeader from './components/CoinDetailedHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {LineChart} from 'react-native-wagmi-charts';
import {getCoinMarketChart, getDetaliedCoinData} from '../../services/requests';
import {useRoute} from '@react-navigation/native';
import {CoinDetailedScreenRouteProp} from '../../navigation';
import COLORS from '../../constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FilteredComponent from './components/FilterComponent';
import {useDispatch} from 'react-redux';

interface filterDay {
  filterDay: string;
  filterText: string;
}

const filterDays: filterDay[] = [
  {filterDay: '1', filterText: '24h'},
  {filterDay: '7', filterText: '7d'},
  {filterDay: '30', filterText: '30d'},
  {filterDay: '365', filterText: '1y'},
  {filterDay: 'max', filterText: 'All'},
];

const CoinDetailedScreen = () => {
  const [coin, setCoin] = useState<any>(null);
  const [coinMarketData, setCoinMarketData] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [coinValue, setCoinValue] = useState<string>('1');
  const [usdValue, setUsdValue] = useState<string>('');
  const [selectedRange, setSelectedRange] = useState<string>('1');

  const dispatch = useDispatch();

  const route = useRoute<CoinDetailedScreenRouteProp>();
  const {
    params: {coinId},
  } = route;

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetaliedCoinData(coinId);
    setCoin(fetchedCoinData);

    setUsdValue(
      fetchedCoinData.market_data.current_price.usd.toFixed(2).toString(),
    );
    setLoading(false);
  };

  const fetchMarketCoinData = async (selectedRangeValue: string) => {
    //setLoading(true);
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue,
    );
    setCoinMarketData(fetchedCoinMarketData);
    //setLoading(false);
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData('1');
    dispatch(fetchWatchListCoinIds());
  }, []);

  const changeCoinValue = (value: string) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(',', '.')) || 0;
    setUsdValue((floatValue * current_price.usd).toFixed(2).toString());
  };
  const changeUsdValue = (value: string) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(',', '.')) || 0;
    setCoinValue((floatValue / current_price.usd).toFixed(2).toString());
  };

  const onSelectedRangeChange = (selectedRangeValue: string) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
  };

  if (loading || !coin || !coinMarketData)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  const {
    id,
    image: {small},
    name,
    symbol,
    market_data: {market_cap_rank, current_price, price_change_percentage_24h},
  } = coin;

  const {prices} = coinMarketData;

  const percentageColor =
    price_change_percentage_24h < 0
      ? COLORS.RED
      : COLORS.GREEN || COLORS.PRIMARY;

  const chartColor =
    current_price.usd > prices[0][1] ? COLORS.GREEN : COLORS.RED;

  const screenWidth = Dimensions.get('window').width;

  const coordinates = prices.map(([x, y]: any) => ({timestamp: x, value: y}));

  return (
    <View>
      <LineChart.Provider data={coordinates}>
        <CoinDetailedHeader
          coinId={id}
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <LineChart.PriceText
              precision={8}
              style={styles.currentPrice}
              format={({value}) => {
                'worklet';

                let updatedvalue;
                if (value) {
                  updatedvalue = value;
                } else {
                  updatedvalue = current_price.usd;
                }

                if (updatedvalue < 1) return `$${updatedvalue}`;

                return `$${parseFloat(updatedvalue).toFixed(2)}`;
              }}
            />
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
              color={COLORS.PRIMARY}
              style={{alignSelf: 'center', marginRight: 5}}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.filtersContainer}>
          {filterDays.map(day => (
            <FilteredComponent
              filterDay={day.filterDay}
              filterText={day.filterText}
              selectedRange={selectedRange}
              setSelectedRange={onSelectedRangeChange}
              key={day.filterText}
            />
          ))}
        </View>

        <GestureHandlerRootView>
          <LineChart width={screenWidth} height={screenWidth / 2}>
            <LineChart.Path color={chartColor}>
              <LineChart.Gradient />
            </LineChart.Path>
            <LineChart.CursorCrosshair color={chartColor} />
          </LineChart>
        </GestureHandlerRootView>
        <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{color: COLORS.PRIMARY, alignSelf: 'center'}}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>

          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{color: COLORS.PRIMARY, alignSelf: 'center'}}>
              USD
            </Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
      </LineChart.Provider>
    </View>
  );
};

export default CoinDetailedScreen;
