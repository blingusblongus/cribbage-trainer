import './PlayingCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@mui/material';

function playingCard({card}){
    const dispatch = useDispatch();
    const hand = useSelector(store => store.hand);
    const selected = hand.filter(el => el.id === card.id) > 0;

    const addToHand = () => {
        //max 4 cards selected
        if(hand.length >= 4) return;

        dispatch({
            type: 'ADD_TO_HAND',
            payload: card.id
        });
    }

    const removeFromHand = () => {
        dispatch({
            type: 'REMOVE_FROM_HAND',
            payload: card.id
        })

        // setSelected(false);
    }

    return (
        //{/* // check both selected and hand.length to prevent sticky selection */}
        <div className={!selected || hand.length === 0 ? 
            "card-container" : "card-container selected"}
            onClick={
                selected ? removeFromHand : addToHand
                }>
            <div>{card.name}</div>
            <div>{card.suit}</div>
        </div>
    );
}

export default playingCard;