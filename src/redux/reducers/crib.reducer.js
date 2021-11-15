const crib = (state = [], action) => {
    switch(action.type) {
        case 'SET_CRIB':
            return action.payload;
        case 'ADD_TO_HAND':
            return state.filter(id => id !== action.payload);
        case 'REMOVE_FROM_HAND':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default crib;