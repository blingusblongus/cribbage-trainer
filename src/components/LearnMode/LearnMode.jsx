import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PlayingCard from '../PlayingCard/PlayingCard.jsx';
import sortValueSuit from '../../modules/sortValueSuit';
import './LearnMode.css';

function LearnMode(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const deal = useSelector(store => store.deal);
    const golfScore = useSelector(store => store.golfScore);
    const golfRounds = useSelector(store => store.global.golfRounds);
    const [displayResults, setDisplayResults] = useState(false);
    const flip = deal.filter(card => card.flip)[0] || null;
    const scores = useSelector(store => store.singleHandCheck);
    const hand = useSelector(store => store.hand);
    const [foundScores, setFoundScores] = useState([]);
    const [scoreList, setScoreList] = useState([]);

    console.log('singleHandCheck', scores);
    console.log(hand);
    console.log('foundScores', foundScores);

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

                    console.log('match', scores[scoreType]);
                    setFoundScores([...foundScores, scoreItem]);
                    //update the store to mark card as found
                    dispatch({
                        type: 'MARK_FOUND',
                        payload: {
                            index: i,
                            scoreType: scoreType
                        }
                    })
                    // setScoreList([...scoreList, {scoreType, cards: combo}])
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

    // const parseScoreType = (scoreType) => {
    //     switch(scoreType){
    //         case 'countFifteens':
    //             return 'Fifteen';
    //         case 'countPairs':
    //             return 'Pair';
    //         case ''
    //     }
    // }

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


    //SORTING==========================
    //sort hand
    sortValueSuit(deal);

    console.log('scoreList', scoreList);
    console.log('totals', totals);

    return (
        <>
            <div className="grid-mid">

            {flip &&
                    <div className="flip-container">
                        <h2 className="flip-title">Flip Card</h2>
                        <PlayingCard key={flip.id} card={flip} />
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
                        addClass={"overlap"}
                    />
                })}
            </div>
        </>
    )
}

export default LearnMode;