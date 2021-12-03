import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './CribbageGolf.css';
import PlayingCard from '../PlayingCard/PlayingCard.jsx';
import Button from '@mui/material/Button';
import ResultChart from '../ResultChart/ResultChart';
import sortValueSuit from '../../modules/sortValueSuit';
import HelpOverlay from '../HelpOverlay/HelpOverlay';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import GolfStats from '../GolfStats/GolfStats';
import { display } from '@mui/system';

function CribbageGolf(props) {
    //Hooks
    const history = useHistory();
    const dispatch = useDispatch();

    //REDUX
    const deal = useSelector(store => store.deal);
    const hand = useSelector(store => store.hand);
    const golfScore = useSelector(store => store.golfScore);
    const results = useSelector(store => store.results);
    const golfRounds = useSelector(store => store.global.golfRounds);

    //Local State
    const [displayResults, setDisplayResults] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const [first, setFirst] = useState(true);
    const [firstClick, setFirstClick] = useState(true);
    const [round, setRound] = useState(1);
    const [details, setDetails] = useState({
        overlay: true,
        messages: [
            'Welcome to Cribbage Golf!',
            'The goal in this mode is to select, by tapping, the four cards that will yield the highest average points, when compared to every possible flip card.',
            'The hand you choose is checked against the remaining 46 possible flip cards in the deck, and is given an average score.',
            'Your golf score is the difference between the average score of your hand, and the average score of the best possible hand that can be made from the 6 dealt cards.',
            `Lower score is better, and the game lasts for ${golfRounds} rounds!`
        ]
    })

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
        setFirstClick(false);
    }

    // Deal a new hand, reset display
    const newHand = () => {
        //push to score page if total rounds met
        if (round >= golfRounds) {
            history.push('/golfResults');
            return;
        }
        dispatch({ type: 'NEW_HAND' });
        setDisplayResults(false);
        setShowChart(false);
        setFirstClick(true);
        setRound(round + 1);
        dispatch({ type: 'DEAL', payload: 6 });
    }

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
    }

    // Show help text
    const showOverlay = () => {
        setDetails({ ...details, overlay: true })
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    console.log(results);
    return (
        <>
            {/* HELP BUTTON */}
            <div
                id="help-btn-container"
                onClick={showOverlay}>
                <HelpOutlineOutlinedIcon fontSize="large" />
            </div>

            {/* HELP OVERLAY */}
            <HelpOverlay details={details} setDetails={setDetails} />

            {/* Results Display (conditional) */}

            <div className="div-center">

                {/* MAIN TEXT CONTENT */}
                <h1>{!displayResults ? 'Choose Cards' : 'Results'}</h1>
                <div className="results-table">
                    <div className="bold"
                    onClick={()=>history.push('/golfResults')}>Round #:</div>
                    <div>{round} of {golfRounds}</div>
                    <div className="bold">Total Points Over Par:</div>
                    <div>{golfScore.reduce((sum, el) => sum += el, 0)?.toFixed(2)}</div>
                    <div className="bold">Last Hand:</div>
                    <div>{golfScore[golfScore.length - 1]?.toFixed(2) || 'NA'}</div>
                </div>


                {/* RESULTS AND NEXT HAND BUTTON */}

                {/* DISPLAY OPTIMAL HAND AFTER SCORING */}
                <div className="optimal-container">
                    <GolfStats results={results} />
                </div>
            </div>


            {/* DISPLAY DEALT HAND */}
            <div className="hand-container abs-center-x">

                {/* Render cards only if the hand has been dealt */}
                {deal.length > 1 && deal?.map(card => {
                    return <PlayingCard
                        key={card.id}
                        card={card}
                        noSelect={false}
                        freeze={displayResults}
                        maxHand={4}
                        addClass={"overlap"}
                    />
                })}
            </div>

            {/* CHART (CONDITIONAL) */}
                <div
                    className={"chart abs-center-x" + (showChart ? "" : " off-right")}
                    onClick={toggleChart}>
                    <ResultChart />
                </div>

            <div class="bottom-btns">
                {/* Render Next Hand button if results are being displayed */}
                <div
                    id="chart-btn"
                    className={"custom-btn bottom-btns" + (displayResults && ' both')}
                    onClick={toggleChart}>
                    {showChart ? 'Hide Chart' : 'Show Chart'}
                </div>
                <div id="score-hand"
                    className={"custom-btn bottom-btns" + 
                        (hand.length === 4 ? '' : ' scared')
                        + (displayResults ? ' both' : '')}
                    onClick={firstClick ? scoreOptimal : newHand}>
                    {firstClick ?
                        'Score Hand' : 'Continue'}
                </div>

            </div>
        </>
    )
}

export default CribbageGolf;