import { useEffect, useState } from 'react';
import Card from '../Card/Card.jsx';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './CribbageGolf.css';

function CribbageGolf(props) {
    const dispatch = useDispatch();
    const deal = useSelector(store => store.deal);
    console.log(deal);


    // Deal cards on page load
    useEffect(() => {
        dispatch({type:'DEAL_6'});
    },[]);


    // Send request for optimum hand checking
    const scoreOptimal = () => {
        dispatch({
            type: "SCORE_OPTIMAL"
        });
    }

    return (
        <>
            <div className="test-container">
                <button onClick={scoreOptimal}>GET</button>
                {/* <Scatter data={data} options={options} /> */}
            </div>
            <div className="hand-container">
                {deal.length > 1 && deal?.map(card => {
                    return <Card
                        key={card.id}
                        card={card}
                    />
                })}
            </div>
        </>
    )
}

export default CribbageGolf;