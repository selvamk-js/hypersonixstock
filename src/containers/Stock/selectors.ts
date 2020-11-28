import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { initialState } from './slice';

const selectRootStore = (state: RootState) => state.stockStore || initialState;

export const selectStockData = createSelector(
  [selectRootStore],
  store => store.stockData
);

export const selectStockDataInfo = createSelector(
  [selectRootStore],
  store => store.stockInfo
);
