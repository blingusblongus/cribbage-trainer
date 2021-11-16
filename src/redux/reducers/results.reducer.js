const results = (state = null, action) => {
    switch(action.type){
        case 'SET_RESULTS':
            return action.payload;
        case 'NEW_HAND':
            return null;
        default:
            return state;
    }
}

export default results;