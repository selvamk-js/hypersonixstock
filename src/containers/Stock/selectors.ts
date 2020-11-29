import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { initialState } from './slice';

const stockStore = (state: RootState) => state.stockStore || initialState;

export const selectStockData = createSelector(
  [stockStore],
  store => store.stockData
);

export const selectStockDataInfo = createSelector(
  [stockStore],
  store => store.stockInfo
);

export const selectStockSearchText = createSelector(
  [stockStore],
  store => store.stockSearch
);
