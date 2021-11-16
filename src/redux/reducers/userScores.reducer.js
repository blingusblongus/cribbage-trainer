const userScores = (state = [], action) => {
    switch(action.type){
      case 'SET_USER_SCORES':
        return [...action.payload];
      default:
        return state;
    }
  }

  export default userScores;