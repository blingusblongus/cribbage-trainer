import { useEffect, useState } from 'react';
import Card from '../Card/Card.jsx';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './CribbageGolf.css';

function CribbageGolf(props) {
    const dispatch = useDispatch();
    const deal = useSelector(store => store.deal);
    const hand = useSelector(store => store.hand);
    const [displayResults, setDisplayResults] = useState(false);

    // Deal cards on page load
    useEffect(() => {
        dispatch({ type: 'DEAL_6' });
    }, []);


    // Send request for optimum hand checking
    const scoreOptimal = () => {
        dispatch({
            type: "SCORE_OPTIMAL"
        });
        setDisplayResults(true);
    }

    // Deal a new hand
    const newHand = () => {
        dispatch({type: 'NEW_HAND'});
        setDisplayResults(false);
        dispatch({type: 'DEAL_6'})
    }

    return (
        <>
            <div className="test-container">
                {/* Render submit button only if hand chosen 
                    and results not displayed  */}
                {(hand.length === 4 && !displayResults)
                    && <button onClick={scoreOptimal}>GET</button>}

                {/* Render Next Hand button if results are being displayed */}
                {displayResults
                    && <button onClick={newHand}>Next Hand</button>}
                <br />
                <br />
                {/* <Scatter data={data} options={options} /> */}
            </div>
            <div className="hand-container">
                {deal.length > 1 && deal?.map(card => {
                    return <Card
                        key={card.id}
                        card={card}
                    />
                })}
            </div>
        </>
    )
}

export default CribbageGolf;