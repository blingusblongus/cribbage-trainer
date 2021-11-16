const golfScore = (state = [], action) => {
    switch(action.type){
        case 'RECORD_GOLF_SCORE':
            return [...state, action.payload];
        case 'CLEAR_GOLF_SCORE':
            return [];
        default:
            return state;
    }
}

export default golfScore;