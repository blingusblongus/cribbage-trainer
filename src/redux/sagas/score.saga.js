import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';

// Deal 6 cards to the user (by default, into the crib)
function* checkOptimal() {
  const store = yield select(store => store);
  try {
    const data = {
      hand: '[' + store.hand.join(', ') + ']',
      crib: '[' + store.crib.join(', ') + ']'
    }
    const response = yield axios.post('/api/score/optimal', data);
    console.log('score result', response.data);
    // yield put({ type: 'SET_DEAL', payload: response.data });
  } catch (error) {
    console.log('Check optimum request failed', error);
  }
}

function* scoreSaga() {
  yield takeLatest('SCORE_OPTIMAL', checkOptimal);
}

export default scoreSaga;
