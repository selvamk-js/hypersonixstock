import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { isEmpty } from 'lodash';
// import Config from 'react-native-config';

import { actions as rootActions } from 'app/slice';
import { ERROR } from 'constants/GlobalConstants';
import Config from 'config/APIConfig';
import { actions } from './slice';
import { MapResponse } from './mappers';
export function* getStockdataAPI() {
  yield delay(500);
  yield put(rootActions.changeGlobalLoader(true));
  try {
    // const response = yield call(
    //   request,
    //   'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=OL196RLISZY6BKBR'
    // );
    const response = yield call(request, Config.URL);

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
    console.log(err);

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
