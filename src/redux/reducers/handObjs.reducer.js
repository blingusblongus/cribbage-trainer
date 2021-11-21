import sortValueSuit from "../../modules/sortValueSuit";

const hand = (state = [], action) => {
    switch(action.type){
        case 'ADD_TO_HAND_OBJS':
            return sortValueSuit([...state, action.payload]);
        case 'REMOVE_FROM_HAND_OBJS':
            return state.filter(card => card.id !== action.payload.id);
        case 'NEW_HAND':
            return [];
        default:
            return state;
    }
}

export default hand;