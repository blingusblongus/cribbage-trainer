import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button } from '@mui/material';
import { useHistory } from "react-router";
import { useEffect } from "react";

function GolfResults(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const golfScore = useSelector(store => store.golfScore);

    useEffect(() => {
        if(golfScore.length > 0){
            dispatch({
                type: 'SUBMIT_GOLF_SCORE',
                payload: {
                    score: golfScore.reduce((sum, round) => sum += round)
                }
            });
        }
    },[])

    return (
        <>
            <div>Golf Results</div>
            <div>
                <p>Total Score (lower is better): {golfScore.reduce((total, score) => total += score, 0)}</p>
                <p>Optimal Hands: {golfScore.filter(score => score === 0).length}</p>
                <p>Results Recorded</p>
                <br/>
                <Button variant="contained" onClick={()=>history.push('/golf')}>Play Again</Button>
            </div>

        </>
    )
}

export default GolfResults;