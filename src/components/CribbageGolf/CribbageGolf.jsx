import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './CribbageGolf.css';
import PlayingCard from '../PlayingCard/PlayingCard.jsx';
import Button from '@mui/material/Button';
import ResultChart from '../ResultChart/ResultChart';


function CribbageGolf(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    let deal = useSelector(store => store.deal);
    const hand = useSelector(store => store.hand);
    const golfScore = useSelector(store => store.golfScore);
    // const round = useSelector(store => store.round);
    const results = useSelector(store => store.results);
    const golfRounds = useSelector(store => store.global.golfRounds);
    const [displayResults, setDisplayResults] = useState(false);
    const [showChart, setShowChart] = useState(false);
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
        setShowChart(false);
        dispatch({ type: 'DEAL_6' })
    }

    const bestHand = results ? (results.length === 1) : false;

    const avgMsg = (results && !bestHand) && (<>
        YOUR HAND AVG: {results[0].stats.avg.toFixed(2)} <br />
        BEST POSSIBLE AVG: {results[1].stats.avg.toFixed(2)} <br />
        DIFFERENCE: {(results[1].stats.avg - results[0].stats.avg).toFixed(2)}
    </>
    )

    //sort hand
    deal.sort((a,b) => {
        return a.index - b.index;
    })
    deal.sort((a,b) => {
        return a.value - b.value;
    })

    //sort results if they exist
    if(results && results[1]){
        let resultDraw = results[1].cards.draw;
        resultDraw.sort((a,b) => {
            return a.index - b.index;
        })
        resultDraw.sort((a,b) => {
            return a.value - b.value;
        })
    }

    const toggleChart = () => {
        setShowChart(!showChart);
    }

    return (
        <>

            {displayResults &&
                <div className="chart-btn">
                    <Button
                        onClick={toggleChart}
                        variant="contained">
                        {showChart ? 'Hide Chart': 'Show Chart'}
                    </Button>
                </div>
            }
            <div className="div-center">
                <h1>{!displayResults ? 'Choose Cards' : 'Results'}</h1>

                {/* Currently on load, it runs double, so round is off by one */}
                <p>Round #: {golfScore.length + 1} of {golfRounds}</p>
                <p>Total Points Over Par: {golfScore.reduce((sum, el) => sum += el, 0)?.toFixed(2)}</p>
                <p>Last Hand: {golfScore[golfScore.length - 1]?.toFixed(2) || 'NA'}</p>

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
                            return (<PlayingCard key={card.id} card={card} noSelect={true} />)
                        })}
                    </div>
                </>
                )}
            </div>


            <div className="hand-container abs-center-x">

                {/* Render cards only if the hand has been dealt */}
                {deal.length > 1 && deal?.map(card => {
                    return <PlayingCard
                        key={card.id}
                        card={card}
                        noSelect={false}
                    />
                })}
            </div>

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