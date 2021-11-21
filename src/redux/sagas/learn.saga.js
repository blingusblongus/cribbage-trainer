import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';

function* fetchCombos() {
  try {
    const deal = yield select(store => store.deal);
    console.log(deal);
    const data = deal;
    const response = yield axios.post('/api/score/single', data);
    yield put({type: 'SET_COMBOS', payload: response.data});
  } catch (err) {
    console.log(err);
  }
}

function* learnSaga() {
  yield takeLatest('FETCH_COMBOS', fetchCombos);

}

export default learnSaga;
