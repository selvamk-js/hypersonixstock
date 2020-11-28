import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { IStockInfo, IStockStore } from './types';

export const initialState: IStockStore = {
  stockInfo: {
    '1. Information': '',
    '2. Symbol': '',
    '3. Last Refreshed': '',
    '4. Interval': '',
    '5. Output Size': '',
    '6. Time Zone': '',
  },
  stockData: [],
};

const stockScreenSlice = createSlice({
  name: 'stockStore',
  initialState,
  reducers: {
    loadStockData(state) {
      state.stockData = [];
    },
    storeStockData(state, action: PayloadAction<[]>) {
      state.stockData = action.payload;
    },
    storeStockInfo(state, action: PayloadAction<IStockInfo>) {
      state.stockInfo = action.payload;
    },
  },
});

export const { actions, reducer, name: stockSliceKey } = stockScreenSlice;
