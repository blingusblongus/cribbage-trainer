import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import hand from './hand.reducer';
import crib from './crib.reducer';
import deal from './deal.reducer';
import golfScore from './golfScore.reducer';
import round from './round.reducer';
import results from './results.reducer';
import global from './global.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user,
  hand,
  crib,
  deal,
  golfScore,
  round,
  results,
  global, // will have an id and username if someone is logged in
});

export default rootReducer;
