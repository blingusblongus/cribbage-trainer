const golfScore = (state = [], action) => {
    switch(action.type){
        case 'RECORD_GOLF_SCORE':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default golfScore;