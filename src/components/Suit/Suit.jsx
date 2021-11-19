import suits from './svg_suits.svg';

function Suit({ suit }) {
    return (
        <img src={suits}></img>
    )
}

export default Suit;