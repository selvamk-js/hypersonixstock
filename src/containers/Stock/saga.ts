import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { isEmpty } from 'lodash';
import Config from 'react-native-config';

import { actions } from './slice';
import { actions as rootActions } from 'app/slice';
import { MapResponse } from './mappers';
import { ERROR } from 'constants/GlobalConstants';
export function* getStockdataAPI() {
  yield delay(500);
  yield put(rootActions.changeGlobalLoader(true));
  try {
    const response = yield call(request, Config.API_URL);

    if (!isEmpty(response)) {
      const MappedRes = MapResponse(response['Time Series (5min)']);
      yield put(actions.storeStockInfo(response['Meta Data']));
      yield put(actions.storeStockData(MappedRes));
      yield put(rootActions.changeGlobalLoader(false));
    } else {
      yield put(actions.storeStockData([]));
      yield put(rootActions.changeGlobalLoader(false));
    }
  } catch (err) {
    yield put(
      rootActions.changeToastMessage({
        toastType: ERROR,
        toastMessage: JSON.stringify(err),
      })
    );
    yield put(rootActions.changeToastVisibility(true));
    yield put(rootActions.changeGlobalLoader(false));
  }
}

export function* stockSaga() {
  yield takeLatest(actions.loadStockData.type, getStockdataAPI);
}
