import { call, put, takeLatest } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
// import { v4 as uuid } from 'uuid';
import { actions } from './slice';
import { actions as rootActions } from 'app/slice';
import { ERROR, INFO } from 'constants/GlobalConstants';

export function* googleSignInAPI() {
  try {
    const userInfo = yield call(GoogleSignin.signIn);

    if (!isEmpty(userInfo)) {
      yield put(actions.storeUserData(userInfo));
      yield put(rootActions.storeUserInfo(userInfo));
      yield call(AsyncStorage.setItem, '@appusertoken', userInfo.idToken);
      yield put(rootActions.changeAccessToken(userInfo.idToken));
    } else {
      yield put(
        rootActions.changeToastMessage({
          toastType: ERROR,
          toastMessage: 'Unable to login something went wrong',
        })
      );
      yield put(rootActions.changeToastVisibility(true));
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      yield put(
        rootActions.changeToastMessage({
          toastType: ERROR,
          toastMessage: "You've cancelled the login flow",
        })
      );
      yield put(rootActions.changeToastVisibility(true));
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      yield put(
        rootActions.changeToastMessage({
          toastType: INFO,
          toastMessage: 'Sign In still In Progress',
        })
      );
      yield put(rootActions.changeToastVisibility(true));
    } else {
      yield put(
        rootActions.changeToastMessage({
          toastType: ERROR,
          toastMessage: 'Unable to login something went wrong...',
        })
      );
      yield put(rootActions.changeToastVisibility(true));
    }
  }
}

export function* loginSaga() {
  yield takeLatest(actions.googleSignIn.type, googleSignInAPI);
}
