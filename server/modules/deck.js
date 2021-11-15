function DeckConstructor() {
    const names = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven',
        'eight', 'nine', 'ten', 'jack', 'queen', 'king'];

    const suits = ['clubs', 'hearts', 'spades', 'diamonds'];

    let cards = [];
    let id = 0;

    for (let suit of suits) {
        let index = 0;

        for (let name of names) {
            cards.push({
                name: name,
                suit: suit,
                value: index < 10 ? index + 1 : 10,
                index: index,
                flip: false,
                id: id
            });

            id++; index++;
        }
    }
    // Fill the deck object and its methods
    const deck = {
        cards: cards,
        deal: function(numCards){
            return this.cards.splice(0, numCards);
        },
        deal5: function() {
            // grab the first 5 cards
            let deal = this.cards.splice(0, 5);
            //set the last card as the flip
            deal[4].flip = true;
            //return hand
            return deal;
        },
        deal6: function() {
            let deal = this.cards.splice(0, 5);
            return deal;
        },
        flip: function() {
            let [deal] = this.cards.splice(0, 1);
            deal.flip = true;
            return deal;
        },
        check: function () { console.log('Deck:', this) },
        shuffle: function () {
            let array = this.cards;
            let m = array.length, t, i;

            // While there remain elements to shuffle…
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            // set new deck order
            this.cards = array;
            return array;
        },
        gather: function() {
            this.cards = new DeckConstructor().cards;
            return this.cards;
        }
    }

    return deck;
}

module.exports = DeckConstructor();

// function shuffle(array) {
//     var m = array.length, t, i;

//     // While there remain elements to shuffle…
//     while (m) {

//         // Pick a remaining element…
//         i = Math.floor(Math.random() * m--);

//         // And swap it with the current element.
//         t = array[m];
//         array[m] = array[i];
//         array[i] = t;
//     }

//     return array;
// }