const golfScore = (state = [], action) => {
    switch(action.type){
        case 'RECORD_GOLF_SCORE':
            return state.push(action.payload);
        default:
            return state;
    }
}

export default golfScore;