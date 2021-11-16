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

    //set Results reducer
    yield put({type: 'SET_RESULTS', payload: response.data});
    
    // send score to the golfScore reducer
    let score;
    if(response.data.length > 1){
      score = response.data[1].stats.avg - response.data[0].stats.avg
    }else{
      score = 0;
    };

    yield put({
      type: 'RECORD_GOLF_SCORE',
      payload: score
    });
  } catch (error) {
    console.log('Check optimal request failed', error);
  }
}

function* recordGolf(action) {
  try{ 
    const response = yield axios.post('/api/score/golf', action.payload);
  }catch(err){
    console.log(err);
  }
}

// // Make sure that the hand is emptied before dealing again
// function* newGolfHand () {
//   yield put({type: 'NEW_HAND'});
//   yield put({type: 'DEAL_6'});
// }

function* scoreSaga() {
  yield takeLatest('SCORE_OPTIMAL', checkOptimal);
  yield takeLatest('SUBMIT_GOLF_SCORE', recordGolf);
  // yield takeLatest('NEW_GOLF_HAND', newGolfHand);
}

export default scoreSaga;
