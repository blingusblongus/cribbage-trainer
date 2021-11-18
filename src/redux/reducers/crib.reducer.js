const crib = (state = [], action) => {
    switch(action.type) {
        case 'SET_CRIB':
            return action.payload.map(card=>card.id);
        case 'ADD_TO_HAND':
            return state.filter(id => id !== action.payload);
        case 'REMOVE_FROM_HAND':
            return [...state, action.payload];
        case 'NEW_HAND':
            return [];
        default:
            return state;
    }
}

export default crib;