const express = require('express');
const router = express.Router();
const scoreUtils = require('../modules/scoring.js');
const probUtils = require('../modules/probability.js');
const pool = require('../modules/pool.js');

// return all possible hands from 4 given cards ************
router.post('/', (req, res) => {
    let response = {
        cards: {
            draw: [],
            crib: []
        }
    };

    //rebuild cards from given ids =======================
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
    }//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


    // SCORE AND PACKAGE ============================

    // use the scoring utility!!!
    let possibleScores = scoreUtils.scoreAll(hand, deck);

    // insert the probability
    probUtils.checkProb(possibleScores);

    //Begin bundling
    response.possibleScores = possibleScores;

    //analyze result and bundle
    response.stats = probUtils.analyzeProbs(response);
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    res.send(response);
});

// check if 4 selected cards are best of 6
// return hand selected and optimal hand, if applicable
router.post('/optimal', (req, res) => {
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

        cribIds.sort();
        handIds.sort();

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

        // BUILD THE SINGLE HAND ==========================
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
        }//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^         

        // SCORE AND PACKAGE ==============================
        // use the scoring utility
        let possibleScores = scoreUtils.scoreAll(hand, deck);

        // insert the probability
        probUtils.checkProb(possibleScores);

        //Begin bundling
        response.possibleScores = possibleScores;

        //analyze result and bundle
        response.stats = probUtils.analyzeProbs(response);

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
            results.push(pruned);
            originalHand = false;
            bestAvg = pruned.stats.avg;
        }else if(pruned.stats.avg > bestAvg){
            results.splice(1, 1, pruned);
            results[0].bestHand = false;
        }

    }//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

        /// SAVE TO HANDS TABLE FOR TESTING ==============
        const hand_score = results.length === 2 ? results[1].stats.avg - results[0].stats.avg : 0;
        const queryObj = {
            optimal: results.length === 1,
            hand_score: hand_score,
        }
    
        const queryText = `
            INSERT INTO hands (user_id, optimal, hand_score, hand_id_str, crib_id_str)
            VALUES ($1, $2, $3, $4, $5);
        `
    
        const values = [req.user.id, queryObj.optimal, queryObj.hand_score, req.body.hand, req.body.crib];
    
        pool.query(queryText, values)
            .then(result => {
                console.log('LOGGED HAND TO DB');
            }).catch(err => {
                console.log(err)
            });
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    res.send(results);
})

// Check a single hand **********************************
router.post('/single', (req, res) => {
    console.log(req.body);
    console.log('called');
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

    const result = scoreUtils.scoreHand(hand, flip)

    res.send(result);
})

// record golf scores
router.post('/golf', (req, res) => {
    const userId = req.user.id;
    const score = req.body.score;

    const queryText = `
        INSERT INTO golf_scores (user_id, golf_score)
        VALUES ($1, $2);
    `
    const values = [userId, score];

    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
})

// Return User specific scores
router.get('/user', (req, res)=>{
    const queryText = `
        SELECT * FROM golf_scores
        WHERE user_id = $1
        ORDER BY golf_score ASC
        LIMIT 10;
    `;

    const values = [req.user.id];

    pool.query(queryText, values)
        .then(result => {
            console.log('GET USER SCORES');
            res.send(result.rows);
        }).catch(err=>{
            console.log(err);
            res.sendStatus(500);
        });
})

// Return all scores from all players
router.get('/leaderboards', (req, res)=>{
    const queryText = `
        SELECT golf_scores.id, user_id, display_name, golf_score, timestamp 
        FROM golf_scores JOIN "user" 
        ON "user".id = golf_scores.user_id
        ORDER BY golf_score ASC
        LIMIT 15;
    `;

    pool.query(queryText)
        .then(result => {
            console.log('GET LEADERBOARD SCORES');
            res.send(result.rows);
        }).catch(err=>{
            console.log(err);
            res.sendStatus(500);
        });
})

module.exports = router;