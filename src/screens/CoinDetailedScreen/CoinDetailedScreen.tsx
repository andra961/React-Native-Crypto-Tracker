import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Coin from '../../../assets/data/crypto.json';
import CoinDetailedHeader from './components/CoinDetailedHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from '@rainbow-me/animated-charts';
import {getCoinMarketChart, getDetaliedCoinData} from '../../services/requests';
import {useRoute} from '@react-navigation/native';
import {CoinDetailedScreenRouteProp} from '../../navigation';

const CoinDetailedScreen = () => {
  const [coin, setCoin] = useState<any>(null);
  const [coinMarketData, setCoinMarketData] = useState<any>(null);

  const [coinValue, setCoinValue] = useState<string>('1');
  const [usdValue, setUsdValue] = useState<string>(
    'current_price.usd.toString()',
  );

  const route = useRoute<CoinDetailedScreenRouteProp>();
  const {
    params: {coinId},
  } = route;

  console.log(coinId);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetaliedCoinData(coinId);
    setCoin(fetchedCoinData);
    const fetchedCoinMarketData = await getCoinMarketChart(coinId);
    setCoinMarketData(fetchedCoinMarketData);
    setUsdValue(
      fetchedCoinData.market_data.current_price.usd.toFixed(2).toString(),
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinData();
  }, []);

  /*const formatCurrency = (value: string) => {
    'worklet';

    if (value === '') {
      return '$' + current_price.usd.toFixed(2);
    }

    return '$' + parseFloat(value).toFixed(2);
  };*/

  //ChartYLabel format={formatCurrency} style={styles.currentPrice}

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
    price_change_percentage_24h < 0 ? '#ea3943' : '#16c784' || 'white';

  const chartColor = current_price.usd > prices[0][1] ? '#16c748' : '#ea3943';

  const screenWidth = Dimensions.get('window').width;

  const coordinates = prices.map(([x, y]: any) => ({x, y}));

  return (
    <View style={{paddingHorizontal: 10}}>
      <ChartPathProvider
        data={{
          points: coordinates,
          smoothingStrategy: 'bezier',
        }}>
        <CoinDetailedHeader
          coinId={id}
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.currentPrice}>{current_price.usd}</Text>
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
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View>
          <ChartPath
            height={screenWidth / 2}
            stroke={chartColor}
            width={screenWidth}
          />
          <ChartDot
            style={{
              backgroundColor: chartColor,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{color: 'white', alignSelf: 'center'}}>
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
            <Text style={{color: 'white', alignSelf: 'center'}}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
      </ChartPathProvider>
    </View>
  );
};

export default CoinDetailedScreen;
