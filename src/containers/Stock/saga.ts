import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { isEmpty } from 'lodash';

import { actions } from './slice';
export function* getStockdataAPI() {
  console.log('test');

  yield delay(500);
  const requestURL = 'https://demo-live-data.highcharts.com/aapl-c.json';

  try {
    const response = yield call(request, requestURL);

    if (!isEmpty(response)) {
      yield put(actions.loadedStockData(response));
    } else {
      yield put(actions.loadedStockData([]));
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}

export function* stockSaga() {
  yield takeLatest(actions.loadStockData.type, getStockdataAPI);
}
