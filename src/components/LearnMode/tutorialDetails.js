import deck from '../../modules/deck';

console.log(deck.cards);

function tutorialDetails(page){
    const details = {
        overlay: false
    };

    const messages = {
        welcome: 
            `Welcome to score training!
            `
    }

    const hands = {

    }

    switch(parseInt(page)){
        case 1:
            details.overlay = true;
            details.overlayMessage = messages.welcome;
            break;
        default:
            return details;
    }

    return details;
}
export default tutorialDetails;