import {atom, selector} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getWatchListedCoins} from '../services/requests';

const allPortfolioBoughtAssets = selector<any[]>({
  key: 'allPortfolioBoughtAssets',
  get: async () => {
    const jsonValue = await AsyncStorage.getItem('@portfolio_coins');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  },
});

export const allPortfolioBoughtAssetsFromAPI = selector<any[]>({
  key: 'allPortfolioBoughtAssetsFromAPI',
  get: async ({get}) => {
    const boughtPortfolioAssets = get(allPortfolioBoughtAssetsInStorage);

    console.log('assetsInStorage', boughtPortfolioAssets);
    const portfolioAssetsMarketData = await getWatchListedCoins(
      boughtPortfolioAssets
        .map((portfolioAsset: any) => portfolioAsset.id)
        .join('%2C'),
    );

    console.log('marketData', portfolioAssetsMarketData);

    const boughtAssets: any = boughtPortfolioAssets.map((boughtAsset: any) => {
      const portfolioAsset = portfolioAssetsMarketData.filter(
        (item: any) => boughtAsset.id === item.id,
      )[0];
      console.log('portfolioAsset', portfolioAsset);
      return {
        ...boughtAsset,
        currentPrice: portfolioAsset.current_price,
        priceChangePercentage: portfolioAsset.price_change_percentage_24h,
      };
    });

    console.log('detailed assets:', boughtAssets);

    return boughtAssets.sort(
      (item1: any, item2: any) =>
        item1.quantityBought * item1.currentPrice <
        item2.quantityBought * item2.currentPrice,
    );
  },
});

export const allPortfolioAssets = atom<any[]>({
  key: 'allPortfolioAssets',
  default: allPortfolioBoughtAssetsFromAPI,
});

export const allPortfolioBoughtAssetsInStorage = atom<any[]>({
  key: 'allPortfolioBoughtAssetsInStorage',
  default: allPortfolioBoughtAssets,
});

export default allPortfolioBoughtAssets;
