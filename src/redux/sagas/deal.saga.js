import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* deal6() {
  try {
    const response = yield axios.get('/api/deal');
    yield put({ type: 'SET_CRIB', payload: response.data });
  } catch (error) {
    console.log('Deal get request failed', error);
  }
}

function* dealSaga() {
  yield takeLatest('DEAL_6', deal6);
}

export default dealSaga;
