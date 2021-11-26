import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './CribbageGolf.css';
import PlayingCard from '../PlayingCard/PlayingCard.jsx';
import Button from '@mui/material/Button';
import ResultChart from '../ResultChart/ResultChart';
import sortValueSuit from '../../modules/sortValueSuit';

function CribbageGolf(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const deal = useSelector(store => store.deal);
    const hand = useSelector(store => store.hand);
    const golfScore = useSelector(store => store.golfScore);
    const results = useSelector(store => store.results);
    const golfRounds = useSelector(store => store.global.golfRounds);
    const [displayResults, setDisplayResults] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [first, setFirst] = useState(true);

    // Deal cards on page load
    useEffect(() => {
        // if starting a game, clear the reducer
        if (first) {
            dispatch({ type: 'CLEAR_GOLF_SCORE' });
            setFirst(false);
        }
        dispatch({ type: 'NEW_HAND' });
        dispatch({ type: 'DEAL', payload: 6 });
    }, []);

    // Send request for optimum hand checking
    const scoreOptimal = () => {
        dispatch({
            type: "SCORE_OPTIMAL"
        });
        setDisplayResults(true);
    }

    // Deal a new hand, reset display
    const newHand = () => {
        //push to score page if total rounds met
        if (golfScore.length >= golfRounds) {
            history.push('/golfResults');
            return;
        }
        dispatch({ type: 'NEW_HAND' });
        setDisplayResults(false);
        setShowChart(false);
        dispatch({ type: 'DEAL', payload: 6 });
    }


    // CONDITIONAL RENDERING ==========
    const bestHand = results ? (results.length === 1) : false;

    const avgMsg = (results && !bestHand) && (<>
        YOUR HAND AVG: {results[0].stats.avg.toFixed(2)} <br />
        BEST POSSIBLE AVG: {results[1].stats.avg.toFixed(2)} <br />
        DIFFERENCE: {(results[1].stats.avg - results[0].stats.avg).toFixed(2)}
    </>
    )//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


    //SORTING==========================
    //sort hand
    sortValueSuit(deal);

    //sort results if they exist
    if (results && results[1]) {
        let resultDraw = results[1].cards.draw;
        sortValueSuit(resultDraw);
    }//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    //BUTTONS===========================
    const toggleChart = () => {
        setShowChart(!showChart);
    }//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    return (
        <>
            {/* Results Display (conditional) */}
            {displayResults &&
                <div className="chart-btn">
                    <Button
                        onClick={toggleChart}
                        variant="contained">
                        {showChart ? 'Hide Chart' : 'Show Chart'}
                    </Button>
                </div>
            }
            <div className="div-center">

                {/* MAIN TEXT CONTENT */}
                <h1>{!displayResults ? 'Choose Cards' : 'Results'}</h1>
                <p>Round #: {golfScore.length + 1} of {golfRounds}</p>
                <p>Total Points Over Par: {golfScore.reduce((sum, el) => sum += el, 0)?.toFixed(2)}</p>
                <p>Last Hand: {golfScore[golfScore.length - 1]?.toFixed(2) || 'NA'}</p>

                {/* RESULTS AND NEXT HAND BUTTON */}
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

                {/* DISPLAY OPTIMAL HAND AFTER SCORING */}
                <div className="optimal-container">
                    {(displayResults && results) && (
                        !bestHand ? avgMsg : 'OPTIMAL HAND, NICE WORK FRIEND'
                    )}
                </div>

                {(displayResults && !bestHand) && (<>
                    <h3>Best Possible Hand</h3>
                    <div className="best-container">
                        {results && results[1]?.cards.draw.map(card => {
                            return (<PlayingCard
                                key={card.id}
                                card={card}
                                noSelect={true}
                                addClass={"overlap"} />)
                        })}
                    </div>
                </>
                )}
            </div>


            {/* DISPLAY DEALT HAND */}
            <div className="hand-container abs-center-x">

                {/* Render cards only if the hand has been dealt */}
                {deal.length > 1 && deal?.map(card => {
                    return <PlayingCard
                        key={card.id}
                        card={card}
                        noSelect={false}
                        maxHand={4}
                        addClass={"overlap"}
                    />
                })}
            </div>

            {/* CHART (CONDITIONAL) */}
            {showChart &&
                <div
                    className="chart abs-center-x"
                    onClick={toggleChart}>
                    <ResultChart />
                </div>

            }
        </>
    )
}

export default CribbageGolf;