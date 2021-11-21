import axios from 'axios';
import { useSelector } from 'react-redux';
import { put, takeLatest, select } from 'redux-saga/effects';

function* fetchCombos() {
  try {
    const crib = yield select(store => store.crib);
    console.log(crib);
    const data = {
      hand: '[' + crib.join(', ') + ']'
    }
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
