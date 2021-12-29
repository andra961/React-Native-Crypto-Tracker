import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from './store';

export const fetchWatchListCoinIds = createAsyncThunk(
  '/watchlist/fetchWatchListCoinIds',
  async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@watchlist_coins');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e: any) {
      console.log(e.msg || e);
    }
  },
);

export const storeWatchListCoinId = createAsyncThunk(
  '/watchlist/storeWatchListCoinId',
  async (coinId: string, {getState}: {getState: any}) => {
    try {
      const newWatchList = [...getState().watchlist.watchlistCoins, coinId];
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem('@watchlist_coins', jsonValue);
      return newWatchList as string[];
    } catch (e: any) {
      console.log(e.msg || e);
      return [];
    }
  },
);

export const removeWatchListCoinId = createAsyncThunk(
  '/watchlist/removeWatchListCoinId',
  async (coinId: string, {getState}: {getState: any}) => {
    const newWatchList = getState().watchlist.watchlistCoins.filter(
      (id: string) => id !== coinId,
    );
    const jsonValue = JSON.stringify(newWatchList);
    await AsyncStorage.setItem('@watchlist_coins', jsonValue);
    return newWatchList as string[];
  },
);

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    watchlistCoins: [] as string[],
    loading: true,
  },
  reducers: {},

  extraReducers: builder => {
    builder.addCase(fetchWatchListCoinIds.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchWatchListCoinIds.fulfilled, (state, action) => {
      state.watchlistCoins = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchWatchListCoinIds.rejected, state => {
      state.loading = false;
    });

    builder.addCase(storeWatchListCoinId.pending, state => {
      state.loading = true;
    });
    builder.addCase(storeWatchListCoinId.fulfilled, (state, action) => {
      state.watchlistCoins = action.payload;
      state.loading = false;
    });
    builder.addCase(storeWatchListCoinId.rejected, state => {
      state.loading = false;
    });

    builder.addCase(removeWatchListCoinId.pending, state => {
      state.loading = true;
    });
    builder.addCase(removeWatchListCoinId.fulfilled, (state, action) => {
      state.watchlistCoins = action.payload;
      state.loading = false;
    });
    builder.addCase(removeWatchListCoinId.rejected, state => {
      state.loading = false;
    });
  },
});

export default watchlistSlice.reducer;
