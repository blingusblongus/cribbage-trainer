import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Deal 6 cards to the user (by default, into the crib)
function* deal6() {
  try {
    const response = yield axios.get('/api/deal');
    yield put({ type: 'SET_DEAL', payload: response.data });
    yield put({type: 'SET_CRIB', payload: response.data});
  } catch (error) {
    console.log('Deal get request failed', error);
  }
}

function* dealSaga() {
  yield takeLatest('DEAL_6', deal6);
}

export default dealSaga;
