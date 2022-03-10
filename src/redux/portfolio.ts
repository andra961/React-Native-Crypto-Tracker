import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getWatchListedCoins} from '../services/requests';
import {ThunkAPI} from './store';

export interface boughtAssets {
  id: string;
  unique_id: string;
  name: string;
  image: string;
  ticker: string;
  boughtQuantity: string;
  priceBought: string;
  currentPrice: string;
  priceChangePercentage: string;
}

export const fetchBoughtAssets = createAsyncThunk<
  boughtAssets[],
  void,
  ThunkAPI
>('/portfolioAssets/fetchBoughtAssets', async (_voidArg, {rejectWithValue}) => {
  try {
    const assetsInStorage = await AsyncStorage.getItem('@portfolio_coins');
    const boughtPortfolioAssets =
      assetsInStorage != null ? JSON.parse(assetsInStorage) : [];

    const portfolioAssetsMarketData = await getWatchListedCoins(
      boughtPortfolioAssets
        .map((portfolioAsset: any) => portfolioAsset.id)
        .join('%2C'),
    );

    const boughtAssets: any = boughtPortfolioAssets.map((boughtAsset: any) => {
      const portfolioAsset = portfolioAssetsMarketData.filter(
        (item: any) => boughtAsset.id === item.id,
      )[0];
      return {
        ...boughtAsset,
        currentPrice: portfolioAsset.current_price,
        priceChangePercentage: portfolioAsset.price_change_percentage_24h,
      };
    });

    return boughtAssets.sort(
      (item1: any, item2: any) =>
        item1.quantityBought * item1.currentPrice <
        item2.quantityBought * item2.currentPrice,
    ) as boughtAssets[];
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    else console.log(e);
    return rejectWithValue({errorMessage: 'failed'});
  }
});

const portfolioSlice = createSlice({
  name: 'portfolioAssets',
  initialState: {
    boughtAssets: [] as boughtAssets[],
    loading: true,
  },
  reducers: {
    setBoughtAssets(state, action: PayloadAction<boughtAssets[]>) {
      state.boughtAssets = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBoughtAssets.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchBoughtAssets.fulfilled, (state, action) => {
      state.boughtAssets = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBoughtAssets.rejected, (state, action) => {
      state.loading = false;
      console.log('fetchBoughtAssets', action.payload?.errorMessage);
    });
  },
});

export const {setBoughtAssets} = portfolioSlice.actions;

export default portfolioSlice.reducer;
