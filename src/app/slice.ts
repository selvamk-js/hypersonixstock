import { PayloadAction } from '@reduxjs/toolkit';
import { INFO } from 'constants/GlobalConstants';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { IToast, IAppRootState, IEmployeeRes } from './types';

export const initialState: IAppRootState = {
  toast: {
    toastMessage: '',
    toastType: INFO,
  },
  accessToken: 'testetoken',
  globalLoader: false,
  toastVisible: false,
  employeeData: [],
};

const githubRepoFormSlice = createSlice({
  name: 'appRootStore',
  initialState,
  reducers: {
    changeAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    changeGlobalLoader(state, action: PayloadAction<boolean>) {
      state.globalLoader = action.payload;
    },
    changeToastVisibility(state, action: PayloadAction<boolean>) {
      state.toastVisible = action.payload;
    },
    changeToastMessage(state, action: PayloadAction<IToast>) {
      state.toast = action.payload;
    },
    loadEmployeeData(state) {
      state.employeeData = [];
    },
    loadedEmployeeData(state, action: PayloadAction<IEmployeeRes[]>) {
      state.employeeData = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = githubRepoFormSlice;
