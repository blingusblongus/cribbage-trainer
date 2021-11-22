const hand = (state = [], action) => {
    switch(action.type){
        case 'ADD_TO_HAND':
            return [...state, action.payload].sort();
        case 'REMOVE_FROM_HAND':
            return state.filter(el => el !== action.payload);
        case 'NEW_HAND':
            return [];
        default:
            return state;
    }
}

export default hand;