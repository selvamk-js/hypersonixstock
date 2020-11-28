import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { initialState } from './slice';

const selectRootStore = (state: RootState) =>
  state.appRootStore || initialState;

export const selectAccessToken = createSelector(
  [selectRootStore],
  store => store.accessToken
);

export const selectGlobalLoader = createSelector(
  [selectRootStore],
  store => store.globalLoader
);
export const selectToastVisibility = createSelector(
  [selectRootStore],
  store => store.toastVisible
);

export const selectToastMessage = createSelector(
  [selectRootStore],
  store => store.toast
);

export const selectEmployeeData = createSelector(
  [selectRootStore],
  store => store.employeeData
);
