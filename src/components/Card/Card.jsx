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
        <div className={selected ? 
            "card-container selected" : "card-container"}
            onClick={
                selected ? removeFromHand : addToHand
                }>
            <div>{card.name}</div>
            <div>{card.suit}</div>
        </div>
    );
}

export default Card;