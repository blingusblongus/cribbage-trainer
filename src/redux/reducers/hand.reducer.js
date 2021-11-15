const hand = (state = [], action) => {
    switch(action.type){
        case 'ADD_TO_HAND':
            return [...state, action.payload];
        case 'REMOVE_FROM_HAND':
            return state.filter(el => el !== action.payload);
        default:
            return state;
    }
}

export default hand;