import './GolfStats.css';
import PlayingCard from '../PlayingCard/PlayingCard';

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

                    <h3>Best Possible Hand</h3>
                    <div className="best-container">
                        
                        {results && results[1]?.cards.draw.map(card => {
                            return (<PlayingCard
                                key={card.id}
                                card={card}
                                noSelect={true}
                                freeze={true}
                                addClass={"overlap"} />)
                        })}
                    </div>
                </>}

            {bestHand &&
                <>
                    
                    <div className="results-table">
                        <div className="bold">YOUR HAND AVG:</div>
                        <div>{results[0].stats.avg.toFixed(2)}</div>
                        <div className="bold">BEST POSSIBLE AVG:</div>
                        <div>{results[0].stats.avg.toFixed(2)}</div>
                        <div className="bold">DIFFERENCE:</div><div>0.00</div>
                    </div>
                    <h2>Optimal Hand!</h2>
                </>
            }
        </>
    )
}

export default GolfStats;