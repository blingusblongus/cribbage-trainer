import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function GolfResults(props) {
    const dispatch = useDispatch();
    const golfScore = useSelector(store => store.golfScore);
    const golfRounds = useSelector(store => store.global.golfRounds);
    let displayConfirm = false;

    return (
        <>
            <div>Golf Results</div>
            <p>Results Recorded</p>
        </>
    )
}

export default GolfResults;