import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button } from '@mui/material';
import { useHistory } from "react-router";
import { useEffect } from "react";
import './GolfResults.css';

function GolfResults(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const golfScore = useSelector(store => store.golfScore);

    // on new hand, assuming all rounds completed, submit score
    useEffect(() => {
        if (golfScore.length > 0) {
            dispatch({
                type: 'SUBMIT_GOLF_SCORE',
                payload: {
                    score: golfScore.reduce((sum, round) => sum += round)
                }
            });
        }
    }, [])

    return (
        <div className="results-container">
            <h2>Golf Results</h2>
            <div className="results-grid">
                <div>Total Score (lower is better):</div>
                <div>{golfScore.reduce((total, score) => total += score, 0).toFixed(3)}</div>
                <div>Optimal Hands:</div> 
                <div>{golfScore.filter(score => score === 0).length}</div>
                
            </div>
            <br/>
            <div className="align-center">Results Recorded</div>
            <br/>
            <div className="flex justify-center">
                <Button variant="contained" onClick={() => history.push('/golf')}>Play Again</Button>
            </div>
        </div>
    )
}

export default GolfResults;