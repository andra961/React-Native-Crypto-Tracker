import axios from 'axios';

export const getDetaliedCoinData = async (coinId: string) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    );

    return response.data;
  } catch (e: any) {
    console.log(e.msg || e);
  }
};

export const getCoinMarketChart = async (
  coinId: string,
  selectedRange: string = '1',
) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}&interval=hourly`,
    );
    return response.data;
  } catch (e: any) {
    console.log(e.msg || e);
  }
};

export const getMarketData = async (pageNumber: number = 1) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`,
    );

    return response.data;
  } catch (e: any) {
    console.log(e.msg || e);
  }
};

export const getWatchListedCoins = async (
  coinIds: string,
  pageNumber: number = 1,
) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`,
    );

    return response.data;
  } catch (e: any) {
    console.log(e.msg || e);
  }
};

export const getAllCoins = async (pageNumber: number = 1) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/list?include_platform=false`,
    );

    return response.data;
  } catch (e: any) {
    console.log(e.msg || e);
  }
};
