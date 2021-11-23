import deck from '../../modules/deck';

console.log(deck.cards);

function tutorialDetails(page){
    const details = {
        overlay: false
    };

    const messages = {
        pairs: [
            'Welcome to score training!',
            'There are many ways to score a hand in cribbage.',
            'Matching pairs are the first way.',
            'Every pair is worth 2 points.',
            'Select the pairs to continue!'
        ],
        multiplePairs: [

        ]
    }

    const hands = {

    }

    details.overlay = true;
    switch(parseInt(page)){
        case 1:
            details.overlayMessage = messages.pairs;
            break;
        case 2:
            details.overlayMessage = messages.multiplePairs;
            break;
        default:
            details.overlay = false;
    }

    return details;
}
export default tutorialDetails;