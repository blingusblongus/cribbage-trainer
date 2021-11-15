import { useEffect, useState } from 'react';
import Card from '../Card/Card.jsx';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './CribbageGolf.css';

function CribbageGolf(props) {
    const dispatch = useDispatch();
    const deal = useSelector(store => store.deal);
    const hand = useSelector(store => store.hand);
    const golfScore = useSelector(store => store.golfScore);
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
        dispatch({ type: 'NEW_HAND' });
        setDisplayResults(false);
        dispatch({ type: 'DEAL_6' })
    }

    return (
        <>
            <h1>{!displayResults ? 'Choose Cards' : 'Results'}</h1>
            <p>Round #: {golfScore.length + 1}</p>
            <p>Total Score: {golfScore.reduce((sum, el) => sum += el, 0)}</p>
            <p>Previous Score: {golfScore[golfScore.length - 1]}</p>
            
            <div className="test-container">
                {/* Render submit button only if hand chosen 
                    and results not displayed  */}
                <div>
                    {(hand.length === 4 && !displayResults)
                        && <button onClick={scoreOptimal}>GET</button>}
                </div>
                <div>
                    {/* Render Next Hand button if results are being displayed */}
                    {displayResults
                        && <button onClick={newHand}>Next Hand</button>}
                </div>
                {/* <Scatter data={data} options={options} /> */}
            </div>
            <div className="hand-container">

                {/* Render cards only if the hand has been dealt */}
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