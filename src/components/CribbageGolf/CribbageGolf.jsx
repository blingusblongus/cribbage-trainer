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
    const round = useSelector(store => store.round);
    const results = useSelector(store => store.results);
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

    const avgMsg = results && (<>
        YOUR HAND AVG: {results[0].stats.avg} <br />
        BEST POSSIBLE AVG: {results[1].stats.avg} <br />
        DIFFERENCE: {results[1].stats.avg - results[0].stats.avg}
    </>
    )

    const bestHand = results ? (results.length === 1) : false;
    console.log(bestHand);

    return (
        <>
            <h1>{!displayResults ? 'Choose Cards' : 'Results'}</h1>
            <p>Round #: {round}</p>
            <p>Total Score: {golfScore.reduce((sum, el) => sum += el, 0)}</p>
            <p>Previous Score: {golfScore[golfScore.length - 1]}</p>

            <div className="optimal-container">
                {(displayResults && results) && (
                    !bestHand ? avgMsg : 'OPTIMAL HAND, NICE WORK FRIEND'
                )}

                <div className="best-container">
                    {results && results[1]?.cards.draw.map(card => {
                        return (<Card key={card.id + 100} card={card} />)
                    })}
                </div>
            </div>

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