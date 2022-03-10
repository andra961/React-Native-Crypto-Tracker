import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState, ThunkAPI} from './store';

export const fetchWatchListCoinIds = createAsyncThunk<string[], void, ThunkAPI>(
  '/watchlist/fetchWatchListCoinIds',
  async (_voidArg, {rejectWithValue}) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@watchlist_coins');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else console.log(e);
      return rejectWithValue({errorMessage: 'failed'});
    }
  },
);

export const storeWatchListCoinId = createAsyncThunk<
  string[],
  string,
  ThunkAPI
>(
  '/watchlist/storeWatchListCoinId',
  async (coinId: string, {getState, rejectWithValue}) => {
    try {
      const newWatchList = [...getState().watchlist.watchlistCoins, coinId];
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem('@watchlist_coins', jsonValue);
      return newWatchList as string[];
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else console.log(e);
      return rejectWithValue({errorMessage: 'failed'});
    }
  },
);

export const removeWatchListCoinId = createAsyncThunk<
  string[],
  string,
  ThunkAPI
>(
  '/watchlist/removeWatchListCoinId',
  async (coinId: string, {getState, rejectWithValue}) => {
    try {
      const newWatchList = getState().watchlist.watchlistCoins.filter(
        (id: string) => id !== coinId,
      );
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem('@watchlist_coins', jsonValue);
      return newWatchList as string[];
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      else console.log(e);
      return rejectWithValue({errorMessage: 'failed'});
    }
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
    builder.addCase(fetchWatchListCoinIds.rejected, (state, action) => {
      state.loading = false;
      console.log('fetchWatchListCoinId', action.payload?.errorMessage);
    });

    builder.addCase(storeWatchListCoinId.pending, state => {
      state.loading = true;
    });
    builder.addCase(storeWatchListCoinId.fulfilled, (state, action) => {
      state.watchlistCoins = action.payload;
      state.loading = false;
    });
    builder.addCase(storeWatchListCoinId.rejected, (state, action) => {
      state.loading = false;
      console.log('storeWatchListCoinId', action.payload?.errorMessage);
    });

    builder.addCase(removeWatchListCoinId.pending, state => {
      state.loading = true;
    });
    builder.addCase(removeWatchListCoinId.fulfilled, (state, action) => {
      state.watchlistCoins = action.payload;
      state.loading = false;
    });
    builder.addCase(removeWatchListCoinId.rejected, (state, action) => {
      state.loading = false;
      console.log('removeWatchListCoinId', action.payload?.errorMessage);
    });
  },
});

export default watchlistSlice.reducer;
