/* eslint new-cap: 0 */
import { takeLatest, put } from 'redux-saga/effects';

import api from '../lib/restApiHelper';
import {
  ME_FETCH_START,
  ME_FETCH_SUCCESS,
  ME_FETCH_ERROR
} from '../actions/me';

// A worker saga. Does all the hard API working code.
// Worker sagas will get resumed whenever the Saga-Middleware gets a response back from the yielded code.
function* fetchCurrentUser(action) {
  try {
    const response = yield api.GET(`${process.env.REACT_APP_API_OPWHSE}/jsonapi/people/${action.hid}?include=department,facilities,spaces`, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    });
    yield put({ type: ME_FETCH_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ME_FETCH_ERROR, payload: error });
  }
}

export default function* meSaga() {
  yield takeLatest(ME_FETCH_START, fetchCurrentUser);
}
