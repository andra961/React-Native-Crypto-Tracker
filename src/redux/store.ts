import {configureStore} from '@reduxjs/toolkit';
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
