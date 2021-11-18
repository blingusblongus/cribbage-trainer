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

function* submitGolf(action) {
  try{ 
    const response = yield axios.post('/api/score/golf', action.payload);
  }catch(err){
    console.log(err);
  }
}

function* getAllScores(){
  try{
    const response = yield axios.get('/api/score/leaderboards');
    yield put({type: "SET_ALL_SCORES", payload: response.data});
  }catch(err){
    console.log(err);
  }
}

// // Make sure that the hand is emptied before dealing again
// function* newGolfHand () {
//   yield put({type: 'NEW_HAND'});
//   yield put({type: 'DEAL_6'});
// }

function* getUserScores(){
  try {
    const response = yield axios.get('/api/score/user');
    yield put({type:'SET_USER_SCORES', payload: response.data});
  }catch(err){
    console.log(err);
  }
}

function* scoreSaga() {
  yield takeLatest('SCORE_OPTIMAL', checkOptimal);
  yield takeLatest('SUBMIT_GOLF_SCORE', submitGolf);
  yield takeLatest('FETCH_USER_SCORES', getUserScores);
  yield takeLatest('GET_LEADERBOARD_SCORES', getAllScores);
  // yield takeLatest('NEW_GOLF_HAND', newGolfHand);
}

export default scoreSaga;
