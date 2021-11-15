const express = require('express');
const router = express.Router();
const scoreUtils = require('../modules/scoring.js');
const probUtils = require('../modules/probability.js');

// return all possible hands from 4 given cards
router.post('/', (req, res) => {
    let response = {
        cards: {
            draw: [],
            crib: []
        }
    };
    const deck = require('../modules/deck.js');
    let handIds = JSON.parse(req.body.hand);
    let cribIds = JSON.parse(req.body.crib);

    deck.gather();

    let hand = [];
    let crib = [];

    const removeFromDeck = (id) => {
        deck.cards = deck.cards.filter(card => {
            return card.id !== id;
        })
    }

    //sort the cards into hand, 
    for (let card of deck.cards) {
        let matched = false;
        for (let id of handIds) {
            if (card.id === id) {
                // push the card to the hand if matched
                hand.push(card); // REMOVE THIS
                response.cards.draw.push(card);
                removeFromDeck(id);
                matched = true;
                break;
            }
        }

        //skip to next card if already matched
        if (matched) continue;

        //check against sent crib ids
        for (let id of cribIds) {
            if (card.id === id) {
                crib.push(card); // REMOVE THIS
                response.cards.crib.push(card);
                matched = true;
                removeFromDeck(id);
            }
        }
    }

    /////// END 

    // use the scoring utility!!!
    let possibleScores = scoreUtils.scoreAll(hand, deck);

    // insert the probability
    probUtils.checkProb(possibleScores);
    // console.log('possible scores w/ probability', possibleScores);

    //Begin bundling
    response.possibleScores = possibleScores;

    //analyze result and bundle
    response.stats = probUtils.analyzeProbs(response);

    //possibility to tweak here by inserting the odds of a max or min hand
    //however, maybe this would be better in a chart.js goal.

    res.send(response);
});

// check if 4 selected cards are best of 6
// return hand selected and optimal hand, if applicable
router.post('/optimal', (req, res) => {
    console.log(req.body);
    let handIds = JSON.parse(req.body.hand);
    let cribIds = JSON.parse(req.body.crib);
    let sets = scoreUtils.setsOf2In6;
    let results = [];

    //combine all cards so we can test all 15 permutations
    let ids = [...cribIds, ...handIds]

    let originalHand = true;
    let bestAvg;
    //loop every permutation of 4 in 6;
    for (let set of sets) {
        cribIds = [ids[set[0]], ids[set[1]]];
        handIds = ids.filter((id, i) => !(i === set[0] || i === set[1]));

        console.log('==========crib', cribIds.sort());
        console.log('==========hand', handIds.sort());

        let response = {
            cards: {
                draw: [],
                crib: []
            }
        };
        let deck = require('../modules/deck.js');


        deck.gather();

        let hand = [];
        let crib = [];

        const removeFromDeck = (id) => {
            deck.cards = deck.cards.filter(card => {
                return card.id !== id;
            })
        }

        //sort the cards into hand, 
        for (let card of deck.cards) {
            let matched = false;
            for (let id of handIds) {
                if (card.id === id) {
                    // push the card to the hand if matched
                    hand.push(card); // REMOVE THIS
                    response.cards.draw.push(card);
                    removeFromDeck(id);
                    matched = true;
                    break;
                }
            }

            //skip to next card if already matched
            if (matched) continue;

            //check against sent crib ids
            for (let id of cribIds) {
                if (card.id === id) {
                    crib.push(card); // REMOVE THIS
                    response.cards.crib.push(card);
                    matched = true;
                    removeFromDeck(id);
                }
            }
        }

        /////// END 

        // use the scoring utility!!!
        let possibleScores = scoreUtils.scoreAll(hand, deck);

        // insert the probability
        probUtils.checkProb(possibleScores);

        //Begin bundling
        response.possibleScores = possibleScores;

        //analyze result and bundle
        response.stats = probUtils.analyzeProbs(response);

        // console.log(response);

        //Strip extra data from possibleScores
        let distribution = {};
        for(let key in possibleScores){
            distribution = {...distribution,
                [key]: {
                    count: possibleScores[key].count,
                    probability: possibleScores[key].probability
                }
            }
        }

        console.log(distribution);

        //create smaller result obj and push
        let pruned = {
            cards: response.cards,
            stats: response.stats,
            bestHand: true,
            bestPossible: {
                score: response.stats.max,
                example: response.possibleScores[response.stats.max].options[0],
                probability: response.possibleScores[response.stats.max].probability
            },
            distribution: distribution
        }

        if(originalHand){
            console.log('first');
            results.push(pruned);
            originalHand = false;
            bestAvg = pruned.stats.avg;
        }else if(pruned.stats.avg > bestAvg){
            console.log('better')
            results.splice(1, 1, pruned);
            results[0].bestHand = false;
        }

    }

    res.send(results);
})

// Check a single hand
router.post('/single', (req, res) => {
    let response = {
        cards: {
            draw: [],
            crib: []
        }
    };
    const deck = require('../modules/deck.js');
    let handIds = JSON.parse(req.body.hand);

    let hand = [];
    const removeFromDeck = (id) => {
        deck.cards = deck.cards.filter(card => {
            return card.id !== id;
        })
    }

    deck.gather();
    for (let card of deck.cards) {
        let matched = false;
        for (let id of handIds) {
            if (card.id === id) {
                // push the card to the hand if matched
                hand.push(card); // REMOVE THIS
                response.cards.draw.push(card);
                removeFromDeck(id);
                matched = true;
                break;
            }
        }

        //skip to next card if already matched
        if (matched) continue;
    }

    hand[4].flip = true;
    let flip = hand.splice(4,1);

    res.send(scoreUtils.scoreHand(hand, flip));
})


module.exports = router;