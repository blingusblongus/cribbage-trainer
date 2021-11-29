import './GolfStats.css';

function GolfStats({ results }) {
    const bestHand = results ? (results.length === 1) : false;

    return (
        <>
            {(results && !bestHand) &&
                <>
                    <div className="results-table">
                        <div className="bold">YOUR HAND AVG:</div> 
                        <div>{results[0].stats.avg.toFixed(2)}</div>
                        <div className="bold">BEST POSSIBLE AVG:</div>
                        <div>{results[1].stats.avg.toFixed(2)}</div>
                        <div className="bold">DIFFERENCE:</div><div> {(results[1].stats.avg - results[0].stats.avg).toFixed(2)}</div>
                    </div>
                </>}
        </>
    )
}

export default GolfStats;