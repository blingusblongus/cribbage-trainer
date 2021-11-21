import './PlayingCard.css';
import { useDispatch, useSelector } from 'react-redux';
import Suit from '../Suit/Suit';

function playingCard({ card, noSelect }) {
    const dispatch = useDispatch();
    const hand = useSelector(store => store.hand);
    const selected = hand.filter(id => id === card.id).length > 0;

    const addToHand = () => {
        //max 4 cards selected
        if (hand.length >= 4) return;

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
        <div className={(!selected || hand.length === 0 || noSelect) ?
            "card-container" : "card-container selected"}
            onClick={
                selected ? removeFromHand : addToHand
            }>
            <div className="card-label">
                <div>{card.icon}</div>
                <div className="edge-suit">
                    <Suit suit={card.suit} />
                </div>
            </div>
            <div className="center-suit">
                <Suit suit={card.suit} />
            </div>
        </div>
    );
}

export default playingCard;