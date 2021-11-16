import './Card.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Card({card}){
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);
    const hand = useSelector(store => store.hand);

    const addToHand = () => {
        //max 4 cards selected
        if(hand.length >= 4) return;

        dispatch({
            type: 'ADD_TO_HAND',
            payload: card.id
        });

        setSelected(true);
    }

    const removeFromHand = () => {
        dispatch({
            type: 'REMOVE_FROM_HAND',
            payload: card.id
        })

        setSelected(false);
    }

    return (
        // check both selected and hand.length to prevent sticky selection
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

export default Card;