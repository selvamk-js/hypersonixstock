import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ILoginStore, IUserData } from './types';

export const initialState: ILoginStore = {
  userData: {
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
};

const loginScreenSlice = createSlice({
  name: 'loginStore',
  initialState,
  reducers: {
    googleSignIn(state) {
      state.userData = {
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
    storeUserData(state, action: PayloadAction<IUserData>) {
      state.userData = action.payload;
    },
  },
});

export const { actions, reducer, name: loginSliceKey } = loginScreenSlice;
