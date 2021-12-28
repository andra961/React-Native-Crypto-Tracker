import {configureStore} from '@reduxjs/toolkit';
import portfolioReducer from './portfolio';

const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
