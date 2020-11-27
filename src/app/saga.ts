import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { isEmpty } from 'lodash';
// import { selectAccessToken } from './selectors';
import { actions } from './slice';
export function* getEmployeesAPI() {
  yield delay(500);
  // const username: string = yield select(selectAccessToken);
  const requestURL = 'http://dummy.restapiexample.com/api/v1/employees';

  try {
    const response = yield call(request, requestURL);
    if (!isEmpty(response) && response.status === 'success') {
      yield put(actions.loadedEmployeeData(response.data));
    } else {
      yield put(actions.loadedEmployeeData([]));
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}

export function* appRootSaga() {
  yield takeLatest(actions.loadEmployeeData.type, getEmployeesAPI);
}
