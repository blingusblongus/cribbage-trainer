import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Deal 6 cards to the user (by default, into the crib)
function* deal(action) {
  try {
    const response = yield axios.get(`/api/deal/${action.payload}`);
    yield put({ type: 'SET_DEAL', payload: response.data });
    yield put({type: 'SET_CRIB', payload: response.data});
    if(response.data.length === 5){
      yield put({type: 'FETCH_COMBOS'});
    }
  } catch (error) {
    console.log('Deal get request failed', error);
  }
}

function* dealSaga() {
  yield takeLatest('DEAL', deal);
}

export default dealSaga;
