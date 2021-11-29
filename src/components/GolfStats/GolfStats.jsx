function GolfStats({ results }) {
    const bestHand = results ? (results.length === 1) : false;

    const avgMsg = (results && !bestHand) && (<>
        YOUR HAND AVG: {results[0].stats.avg.toFixed(2)} <br />
        BEST POSSIBLE AVG: {results[1].stats.avg.toFixed(2)} <br />
        DIFFERENCE: {(results[1].stats.avg - results[0].stats.avg).toFixed(2)}
    </>
    )

    return (
        <>
            {(results && !bestHand) && 
            <>
                <div>YOUR HAND AVG: {results[0].stats.avg.toFixed(2)}</div>
                <div>BEST POSSIBLE AVG: {results[1].stats.avg.toFixed(2)}</div>
                <div>DIFFERENCE: {(results[1].stats.avg - results[0].stats.avg).toFixed(2)}</div>
            </>}
        </>
    )
}

export default GolfStats;