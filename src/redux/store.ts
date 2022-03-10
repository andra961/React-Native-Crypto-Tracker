import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import portfolioReducer from './portfolio';
import watchlistReducer from './watchlist';

const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    watchlist: watchlistReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type ThunkAPI = {
  dispatch: AppDispatch;
  state: RootState;
  rejectValue: {errorMessage: string};
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
