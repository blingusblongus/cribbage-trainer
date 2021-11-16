import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function GolfResults(props) {
    const dispatch = useDispatch();
    const golfScore = useSelector(store => store.golfScore);
    let displayConfirm = false;


    const submitResults = () => {
        if (golfScore.length >= 4) {
            dispatch({
                type: 'SUBMIT_GOLF_SCORE',
                payload: {
                    score: golfScore.reduce((sum, round) => sum += round)
                }
            })
        }
    }

    if (golfScore.length >= 4) {
        submitResults();
        displayConfirm = true;
    }



    return (
        <>
            <div>Golf Results</div>
            {displayConfirm && <p>Results Recorded</p>}
        </>
    )
}

export default GolfResults;