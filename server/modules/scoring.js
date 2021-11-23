const setsOf2 = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 4],
]
const setsOf3 = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 1, 4],
    [0, 2, 3],
    [0, 2, 4],
    [0, 3, 4],
    [1, 2, 3],
    [1, 2, 4],
    [1, 3, 4],
    [2, 3, 4],
]
const setsOf4 = [
    [0, 1, 2, 3],
    [0, 1, 2, 4],
    [0, 1, 3, 4],
    [0, 2, 3, 4],
    [1, 2, 3, 4]
]
const setsOf5 = [
    [0, 1, 2, 3, 4]
]
const allSets = [setsOf2, setsOf3, setsOf4, setsOf5];

const setsOf2In6 = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 4],  
    [3, 5],
    [4, 5]
]

function countFifteens(hand) {
    let successes = [];
    for (let set of allSets) {
        for (let combo of set) {
            //check combo to see if it === 15
            let count = 0;

            for (let i = 0; i < combo.length; i++) {
                let card = hand[combo[i]];
                count += card.value;

                //Stop counting if already over 15
                if (count > 15) break;
            }

            // push on success
            if (count === 15) {
                successes.push(combo);
            }
        }
    }

    //write the result obj
    let result = {
        name: 'fifteens',
        points: successes.length * 2,
        hands: successes.map(success => {
            return success.map(cardIndex => {
                return hand[cardIndex];
            })
        })
    }
    return result;
}

//could be made better by searching first for quads, then trips, and filtering
function countPairs(hand) {
    let successes = [];
    for (let combo of setsOf2) {
        if (hand[combo[0]].name === hand[combo[1]].name) {
            successes.push(combo);
        }
    }

    const result = {
        name: 'pairs',
        points: 2 * successes.length,
        hands: successes.map(success => {
            return success.map(cardIndex => {
                return hand[cardIndex];
            })
        })
    }
    return result;
}

function countFlush(hand) {
    let successes = [];
    let points = 0;

    //get just the cards from the draw
    let draw = hand.filter(card => !card.flip);
    let flip = hand.filter(card => card.flip);
    
    //check for 4-card flush
    if(draw.every((card, i, arr) => card.suit === arr[0].suit)){
        points = 4;
        successes.push(draw);
        let suit = draw[0].suit;

        //check for 5-card flush
        if(flip.suit === suit){
            points = 5;
            successes = [hand];
        }
    }

    const result = {
        name: 'flush',
        points: points,
        hands: successes
    }

    return result;
}

function countNibsNobs(hand) {
    const [flip] = hand.filter(card => card.flip);
    if (flip.name === 'jack') {
        return {
            points: 2,
            name: 'nibs',
            hands: [[flip]]
        }
    }

    const notFlip = hand.filter(card => !card.flip);

    for (let card of notFlip) {
        if (card.name === 'jack' && flip.suit === card.suit) {
            return {
                points: 1,
                name: 'nobs',
                hands: [[flip]]
            }
        }
    }

    return {
        name: 'none',
        points: 0,
        hands: []
    }
}

function countRuns(hand) {
    let successes = [];

    // sort hand to make things easier
    hand.sort((a, b) => {
        return a.index - b.index;
    });

    for (let set of [setsOf5, setsOf4, setsOf3]) {
        for (let combo of set) {
            //map the card permutation (in order)
            let cards = combo.map(i => hand[i]);

            let result = true;
            // check for run
            for (let i = 1; i < cards.length; i++) {
                if (cards[i - 1].index !== cards[i].index - 1) {
                    result = false;
                    break;
                }
            }

            if (result) {

                //check if you might be checking a larger scored set
                let dupe = false;
                for (let score of successes) {
                    const scoreIds = score.map(card => card.id);
                    const cardIds = cards.map(card => card.id);

                    if(cardIds.every((id, i) => id === scoreIds[i])){
                        dupe = true;
                    }

                    // for (let i = 0; i < cards.length; i++) {
                        

                    //     if (cards[i].index === score[i].index &&
                    //         cards[i].suit !== score[i].suit) {
                    //         dupe = false;
                    //         break;
                    //     }
                    //     dupe = true;
                    // }
                }
                //exit early if already scored as a larger run
                if (dupe) break;

                successes.push(cards);
            }
        }
    }

    return {
        name: 'runs',
        points: successes.reduce((sum, el) => sum += el.length, 0),
        hands: successes
    }
}

const scoreUtils = {
    scoringMethods: {
        countFifteens: countFifteens,
        countPairs: countPairs,
        countNibsNobs: countNibsNobs,
        countRuns: countRuns,
        countFlush: countFlush
    },
    scoreHand: function(nonFlips, flip) {
        // init obj to be returned
        const option = {
            handScore: 0,
            flipCard: flip,
            scores: {},
        }
    
        // create copy of complete hand for scoring
        let fullHand = nonFlips.concat(flip);
    
        // loop through scoringMethods, collect 
        for (let func in this.scoringMethods) {
            let scoringMethod = this.scoringMethods[func];
            let scoredHand = scoringMethod(fullHand);
            let points = scoredHand.points;
            let hands = scoredHand.hands;
    
            if(points > 0){
                //add points and push combo
                option.handScore += points;
                option.scores[func] = hands;
            }
    
        } 
        return option;
    },
    scoreAll: function (hand, deck) {
        let possibleScores = {};
        while (deck.cards.length > 0) {

            //grab the next card from the deck and set it flip
            // let newHand = [...hand, deck.flip()];
            let flip = deck.flip();
            let option = this.scoreHand(hand, flip);

            //add to possibleScores
            let scoreVal = option.handScore;
            
            // check if the number of points is added to possibleScores
            if (possibleScores[scoreVal]) {
                // increment the count of this score
                possibleScores[scoreVal].count++;
                // fill array of scoring combos for this score
                possibleScores[scoreVal].options = [...possibleScores[scoreVal].options, option]
            } else {
                // make a score entry if it doesn't exist
                possibleScores[scoreVal] = { count: 1, options: [option] };
            };

        }
        return possibleScores;
    },
    setsOf2In6: setsOf2In6
}

module.exports = scoreUtils;