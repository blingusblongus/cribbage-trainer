const singleHandCheck = (state = [], action) => {
    //actually sets scoringCombos to the whole object returned from /single
    switch(action.type){
        case 'SET_COMBOS':
            return action.payload
        default:
            return state;
    }
}

export default singleHandCheck;