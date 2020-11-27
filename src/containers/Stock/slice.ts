import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { IStockStore } from './types';

export const initialState: IStockStore = {
  stockData: [],
};

const stockScreenSlice = createSlice({
  name: 'stockStore',
  initialState,
  reducers: {
    loadStockData(state) {
      state.stockData = [];
    },
    loadedStockData(state, action: PayloadAction<[]>) {
      state.stockData = action.payload;
    },
  },
});

export const { actions, reducer, name: stockSliceKey } = stockScreenSlice;
