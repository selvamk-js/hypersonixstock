import { PayloadAction } from '@reduxjs/toolkit';
import { INFO } from 'constants/GlobalConstants';
import { IUserData } from 'containers/Login/types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { IToast, IAppRootState, IEmployeeRes } from './types';

export const initialState: IAppRootState = {
  toast: {
    toastMessage: '',
    toastType: INFO,
  },
  accessToken: undefined,
  globalLoader: false,
  toastVisible: false,
  splashLoad: false,
  employeeData: [],
  userInfo: {
    idToken: '',
    serverAuthCode: '',
    scopes: [], // on iOS this is empty array if no additional scopes are defined
    user: {
      email: '',
      id: '',
      givenName: '',
      familyName: '',
      photo: '', // url
      name: '', // full name
    },
  },
  isBioValidated: true,
};

const githubRepoFormSlice = createSlice({
  name: 'appRootStore',
  initialState,
  reducers: {
    changeAccessToken(state, action: PayloadAction<string | undefined>) {
      state.accessToken = action.payload;
    },
    restoreAccessToken(state, action: PayloadAction<string | undefined>) {
      state.accessToken = action.payload;
      state.splashLoad = false;
    },
    resetAccessToken(state) {
      state.accessToken = undefined;
      state.splashLoad = false;
      state.userInfo = {
        idToken: '',
        serverAuthCode: '',
        scopes: [], // on iOS this is empty array if no additional scopes are defined
        user: {
          email: '',
          id: '',
          givenName: '',
          familyName: '',
          photo: '', // url
          name: '', // full name
        },
      };
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
    storeUserInfo(state, action: PayloadAction<IUserData>) {
      state.userInfo = action.payload;
    },
    changeIsBioValid(state, action: PayloadAction<boolean>) {
      state.isBioValidated = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = githubRepoFormSlice;
