import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PlayingCard from '../PlayingCard/PlayingCard.jsx';
import sortValueSuit from '../../modules/sortValueSuit';
import './LearnMode.css';
import tutorialDetails from './tutorialDetails.js';
import { Button } from '@mui/material';

function LearnMode(props) {
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const deal = useSelector(store => store.deal);
    const flip = deal.filter(card => card.flip)[0] || null;
    const scores = useSelector(store => store.singleHandCheck);
    const hand = useSelector(store => store.hand);
    const [foundScores, setFoundScores] = useState([]);
    const [details, setDetails] = useState(tutorialDetails(params.page));
    const [matched, setMatched] = useState('');

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

    // const totalPoints = foundScores?.reduce((sum, score) => {
    //     return sum += score.points
    // }, 0);

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


    return (
        <>
            <div className="grid-mid">
                {flip &&
                    <div className="flip-container">
                        <h2 className="flip-title">Flip Card</h2>
                        <PlayingCard 
                            key={flip.id} 
                            card={flip}
                            addClass={'outlined' + matched} />
                    </div>
                }

                <div className="found-scores">
                    <div>
                        Total Points: {totals.foundPoints} of {totals.possiblePoints}
                    </div>

                    {foundScores?.map((score, i) => {
                        return (
                            <div key={i} className="found-score">
                                {score.name} for {score.points}
                            </div>
                        )
                    })}
                </div>
                <div></div>
                <Button
                    onClick={newHand}
                    variant="contained"
                    disabled={totals.foundPoints !== totals.possiblePoints}
                >New Hand</Button>
            </div>

            <div className="hand-container abs-center-x">
                {/* Render cards only if the hand has been dealt */}
                {deal.length > 1 && deal?.map(card => {
                    if (card.flip) return;
                    return <PlayingCard
                        key={card.id}
                        card={card}
                        noSelect={false}
                        max4={false}
                        addClass={'overlap outlined' + matched}
                    />
                })}
            </div>

            <div className={details.overlay ?
                "overlay-container" : "fade"}
                onClick={() => setDetails({ ...details, overlay: false })}>
                <div
                    className="overlay"
                >
                </div>
                <h3 className={details.overlay ?
                    "flashing dismiss-message" : "dismiss-message overlay fade"}>
                    Tap Anywhere to Dismiss
                </h3>
                <div className={details.overlay ?
                    "overlay-body" : "overlay-body fade"}>
                    {details.messages?.map((message, i) => {
                        return <p key={i}>{message}</p>;
                    })}
                </div>
            </div>

        </>
    )
}

export default LearnMode;