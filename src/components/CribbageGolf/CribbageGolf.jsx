import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './CribbageGolf.css';
import Card from '../Card/PlayingCard.jsx';
import Button from '@mui/material/Button';


function CribbageGolf(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const deal = useSelector(store => store.deal);
    const hand = useSelector(store => store.hand);
    const golfScore = useSelector(store => store.golfScore);
    // const round = useSelector(store => store.round);
    const results = useSelector(store => store.results);
    const golfRounds = useSelector(store => store.global.golfRounds);
    const [displayResults, setDisplayResults] = useState(false);
    const [first, setFirst] = useState(true);

    // Deal cards on page load
    useEffect(() => {
        if (first) {
            dispatch({ type: 'CLEAR_GOLF_SCORE' });
            setFirst(false);
        }
        dispatch({ type: 'NEW_HAND' });
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

        //push to score page if total rounds met
        if (golfScore.length >= golfRounds) {
            history.push('/golfResults');
            return;
        }
        dispatch({ type: 'NEW_HAND' });
        setDisplayResults(false);
        dispatch({ type: 'DEAL_6' })
    }

    const bestHand = results ? (results.length === 1) : false;

    const avgMsg = (results && !bestHand) && (<>
        YOUR HAND AVG: {results[0].stats.avg} <br />
        BEST POSSIBLE AVG: {results[1].stats.avg} <br />
        DIFFERENCE: {results[1].stats.avg - results[0].stats.avg}
    </>
    )

    return (
        <>
            <div className="div-center">
                <h1>{!displayResults ? 'Choose Cards' : 'Results'}</h1>

                {/* Currently on load, it runs double, so round is off by one */}
                <p>Round #: {golfScore.length + 1} of {golfRounds}</p>
                <p>Total Score: {golfScore.reduce((sum, el) => sum += el, 0)?.toFixed(2)}</p>
                <p>Previous Score: {golfScore[golfScore.length - 1]?.toFixed(2) || 'NA'}</p>

                <div className="test-container abs-center-x">
                    {/* Render submit button only if hand chosen 
                    and results not displayed  */}
                    <div>
                        {(hand.length === 4 && !displayResults)
                            && <Button variant="contained"
                                onClick={scoreOptimal}>Get Hand Avg</Button>}
                    </div>
                    <div>
                        {/* Render Next Hand button if results are being displayed */}
                        {displayResults
                            && <Button variant="contained"
                                onClick={newHand}>
                                {golfScore.length === golfRounds ? 
                                    'See results' : 'Next Hand'}
                            </Button>}
                    </div>
                    {/* <Scatter data={data} options={options} /> */}
                </div>

                <div className="optimal-container">
                    {(displayResults && results) && (
                        !bestHand ? avgMsg : 'OPTIMAL HAND, NICE WORK FRIEND'
                    )}
                </div>

                {(displayResults && !bestHand) && (<>
                    <h3>Best Possible Hand</h3>
                    <div className="best-container">
                        {results && results[1]?.cards.draw.map(card => {
                            return (<Card key={card.id} card={card} noSelect={true} />)
                        })}
                    </div>
                </>
                )}
            </div>


            <div className="hand-container abs-center-x">

                {/* Render cards only if the hand has been dealt */}
                {deal.length > 1 && deal?.map(card => {
                    return <Card
                        key={card.id}
                        card={card}
                        noSelect={false}
                    />
                })}
            </div>
        </>
    )
}

export default CribbageGolf;