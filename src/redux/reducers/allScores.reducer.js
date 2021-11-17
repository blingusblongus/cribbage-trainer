const allScores = (state = [], action) => {
    switch(action.type){
      case 'SET_ALL_SCORES':
        return [...action.payload];
      default:
        return state;
    }
  }

  export default allScores;