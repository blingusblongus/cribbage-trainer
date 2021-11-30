import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PlayingCard from '../PlayingCard/PlayingCard.jsx';
import sortValueSuit from '../../modules/sortValueSuit';
import './LearnMode.css';
import tutorialDetails from './tutorialDetails.js';
import { Button } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import HelpOverlay from '../HelpOverlay/HelpOverlay.jsx';

function LearnMode(props) {
    // Hooks
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    // REDUX
    const deal = useSelector(store => store.deal);
    const flip = deal.filter(card => card.flip)[0] || null;
    const scores = useSelector(store => store.singleHandCheck);
    const hand = useSelector(store => store.hand);

    // LOCAL STATE
    const [foundScores, setFoundScores] = useState([]);
    const [details, setDetails] = useState(tutorialDetails(params.page));
    const [matched, setMatched] = useState('');
    const [revealed, setRevealed] = useState([]);

    const checkSelected = () => {
        //iterate through all stored scoring hands
        for (let scoreType in scores) {
            for (let i = 0; i < scores[scoreType].length; i++) {
                if (scores[scoreType][i].found) {
                    continue;
                }

                let scoreItem = scores[scoreType][i];
                let combo = scoreItem.combo;
                //check selection against scoring hand
                if (hand.length === combo.length
                    && combo.filter(card => hand.includes(card.id)).length === hand.length) {

                    setFoundScores([...foundScores, scoreItem]);
                    //update the store to mark card as found
                    dispatch({
                        type: 'MARK_FOUND',
                        payload: {
                            index: i,
                            scoreType: scoreType
                        }
                    });

                    setMatched(' matched');
                    setTimeout(() => {
                        // DESELECT ALL CARDS
                        dispatch({
                            type: 'NEW_HAND'
                        });
                        setMatched('');
                    }, 700);
                }
            }
        }
    }

    // Deal cards on page load
    useEffect(() => {
        dispatch({ type: 'NEW_HAND' });
        dispatch({ type: 'DEAL', payload: 5 });
    }, []);

    // run checkSelected when hand is updated
    useEffect(() => {
        checkSelected();
    }, [hand]);

    // Deal a new hand
    const newHand = () => {
        dispatch({ type: 'NEW_HAND' });
        dispatch({ type: 'DEAL', payload: 5 });
        setFoundScores([]);
        if (params.page) {
            let nextPage = parseInt(params.page) + 1
            history.push(`/learn/${nextPage}`);
            setDetails(tutorialDetails(nextPage));
        }
    }

    // CONDITIONAL RENDERING ==========

    const totals = {
        foundPoints: foundScores?.reduce((sum, score) => {
            return sum += score.points
        }, 0),
        //iterate through scores object and sum object[key].points
        possiblePoints: Object.keys(scores)?.reduce((sum, scoreType) => {
            return sum += scores[scoreType].reduce((points, type) => {
                return points += type.points;
            }, 0);
        }, 0)
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    //set Custom Hand if training mode
    if (details.hand) {
        dispatch({ type: 'SET_DEAL', payload: details.hand });
    }

    //SORTING==========================
    //sort hand
    sortValueSuit(deal);

    // Track a specific scoring combo for highlighting
    const showFound = (show, i) => {
        if (show) {
            setRevealed(foundScores[i] || []);
        } else {
            setRevealed([]);
        }
    }

    // Show help text
    const showOverlay = () => {
        setDetails({...details, overlay: true})
    }

    // assign each card the revealed class if the card belongs to the
    // selected scoring combo
    const isRevealed = (card) => {
        if (revealed && revealed.combo) {
            for (let comboCard of revealed.combo) {
                if (comboCard.id === card.id) {
                    return ' revealed';
                }
            }
        }
        return '';
    }

    return (
        <>

            {/* HELP BUTTON */}
            <div 
                id="help-btn-container"
                onClick={showOverlay}>
                <HelpOutlineOutlinedIcon fontSize="large" />
            </div>

            <div className="grid-mid">
                {/* FLIP CARD */}
                {flip &&
                    <div className="flip-container">
                        <h4 className="flip-title">Flip Card</h4>
                        <PlayingCard
                            key={flip.id}
                            card={flip}
                            addClass={'outlined' + matched + isRevealed(flip)} />
                    </div>
                }

                {/* DISPLAY LIST OF FOUND SCORES */}
                <div className="found-scores">
                    <h4>
                        Total Points: {totals.foundPoints} of {totals.possiblePoints}
                    </h4>

                    {foundScores?.map((score, i) => {
                        return (
                            <div key={i}
                                className="found-score"
                                // attempting to handle touch and mobile screen
                                onMouseDown={() => showFound(true, i)}
                                onMouseUp={() => showFound(false, i)}
                                onTouchStart={() => showFound(true, i)}
                                onTouchEnd={() => showFound(false, i)}
                            >
                                {score.name} for {score.points}
                            </div>
                        )
                    })}
                    <div className="flex-align-bottom">
                    <Button
                        onClick={newHand}
                        variant="contained"
                        disabled={totals.foundPoints !== totals.possiblePoints}
                    >Next Hand</Button>
                    </div>
                </div>

                <div></div>

            </div>

            {/* SHOW CARDS IN HAND */}
            <div className="hand-container abs-center-x">
                {/* Render cards only if the hand has been dealt */}
                {deal.length > 1 && deal?.map(card => {
                    if (card.flip) return;
                    return <PlayingCard
                        key={card.id}
                        card={card}
                        noSelect={false}
                        max4={false}
                        addClass={'overlap outlined' + matched + isRevealed(card)}
                    />
                })}
            </div>

            {/* HELP OVERLAY COMPONENT */}
            <HelpOverlay details={details} setDetails={setDetails}/>
        </>
    )
}

export default LearnMode;