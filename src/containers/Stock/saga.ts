import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { isEmpty } from 'lodash';
import Config from 'react-native-config';

import { actions } from './slice';
import { MapResponse } from './mappers';
export function* getStockdataAPI() {
  // yield delay(500);
  try {
    const response = yield call(request, Config.API_URL);

    if (!isEmpty(response)) {
      const MappedRes = MapResponse(response['Time Series (5min)']);
      yield put(actions.storeStockInfo(response['Meta Data']));
      yield put(actions.storeStockData(MappedRes));
    } else {
      yield put(actions.storeStockData([]));
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}

export function* stockSaga() {
  yield takeLatest(actions.loadStockData.type, getStockdataAPI);
}
