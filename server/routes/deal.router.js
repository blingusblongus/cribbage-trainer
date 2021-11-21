const express = require('express');
const router = express.Router();
const deck = require('../modules/deck.js');

router.get('/:count', deal);

function deal(req, res) {
    deck.gather();
    deck.shuffle();

    //Deal the number of cards requested
    let deal = deck.deal(req.params.count);

    //if dealing a hand of five, set the last card as the flip
    if(req.params.count === '5'){
        deal[4].flip = true;
    }
    res.send(deal);
}


module.exports = router;

