
import './Suit.css';
import clubs from './clubs.svg';
import spades from './spades.svg';
import hearts from './hearts.svg';
import diamonds from './diamonds.svg';

function Suit({ suit }) {
    let selected;
    switch(suit){
        case 'clubs':
            selected = clubs;
            break;
        case 'spades':
            selected = spades;
            break;
        case 'hearts':
            selected = hearts;
            break;
        case 'diamonds':
            selected = diamonds;
            break;
    }

    return (
        // <img className={'heart'} src={suits}></img>
        <img src={selected}></img>
        )
}

export default Suit;