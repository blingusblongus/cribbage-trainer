import deck from '../../modules/deck';

console.log(deck.cards);

function tutorialDetails(page){
    const details = {
        overlay: false
    };

    const scenarios = {
        pairs: {
            messages: [
                'Welcome to score training!',
                'There are many ways to score a hand in cribbage.',
                'Matching pairs are the first way.',
                'Every pair is worth 2 points.',
                'Select the pairs to continue!'
            ],
            hand: [
                {"name":"eight","icon":"8","suit":"clubs","value":8,"index":7,"flip":false,"id":7},
                {"name":"two","icon":"2","suit":"clubs","value":2,"index":1,"flip":false,"id":1},
                {"name":"eight","icon":"8","suit":"hearts","value":8,"index":7,"flip":false,"id":20},
                {"name":"six","icon":"6","suit":"spades","value":6,"index":5,"flip":false,"id":31},
                {"name":"two","icon":"2","suit":"diamonds","value":2,"index":1,"flip":true,"id":40},
            ]
        },
        multiplePairs: {
            messages: [
                'In cribbage, a single card can be used in multiple scoring combinations.',
                'For example, a three-of-a-kind is actually scored as three distinct pairs!',
                'Find all three pairs of queens in this hand.'
            ],
            hand: [
                {"name":"queen","icon":"Q","suit":"diamonds","value":10,"index":11,"flip":false,"id":50},
                {"name":"two","icon":"2","suit":"clubs","value":2,"index":1,"flip":false,"id":1},
                {"name":"queen","icon":"Q","suit":"hearts","value":10,"index":11,"flip":false,"id":24},
                {"name":"six","icon":"6","suit":"spades","value":6,"index":5,"flip":false,"id":31},
                {"name":"queen","icon":"Q","suit":"spades","value":10,"index":11,"flip":true,"id":37},   
            ]
        }
    }

    details.overlay = true;
    switch(parseInt(page)){
        case 1:
            details.overlayMessage = scenarios.pairs.messages;
            details.hand = scenarios.pairs.hand;
            break;
        case 2:
            details.overlayMessage = scenarios.multiplePairs.messages;
            details.hand = scenarios.multiplePairs.hand;
            break;
        default:
            details.overlay = false;
    }

    return details;
}
export default tutorialDetails;