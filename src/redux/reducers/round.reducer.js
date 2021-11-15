const round = (state = 1, action) => {
    switch(action.type){
        case 'NEW_HAND':
            return state + 1;
        case 'NEW_GAME':
            return 1;
        default:
            return state;
    }
}

export default round;