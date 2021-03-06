const scenarios = [
    {
        messages: [
            'Welcome to score training!',
            'There are many ways to score a hand in cribbage.',
            'Matching pairs are the first way.',
            'Every pair is worth 2 points.',
            'Tap the pairs to continue!'
        ],
        hand: [
            {"name":"eight","icon":"8","suit":"clubs","value":8,"index":7,"flip":false,"id":7},
            {"name":"two","icon":"2","suit":"clubs","value":2,"index":1,"flip":false,"id":1},
            {"name":"eight","icon":"8","suit":"hearts","value":8,"index":7,"flip":false,"id":20},
            {"name":"six","icon":"6","suit":"spades","value":6,"index":5,"flip":false,"id":31},
            {"name":"two","icon":"2","suit":"diamonds","value":2,"index":1,"flip":true,"id":40},
        ]
    },
    {
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
    },
    {
        messages: [
            'In addition to scoring pairs, any combination of cards that adds up to 15 is worth 2 points.',
            'Find both sets of fifteen in this hand.',
            'Remember that you can re-use cards when counting different scoring combinations!',
            'Important: In cribbage, all face cards are counted as ten, and aces are counted as one!'
        ],
        hand: [
            {"name":"ace","icon":"A","suit":"clubs","value":1,"index":0,"flip":false,"id":0},
            {"name":"five","icon":"5","suit":"spades","value":5,"index":4,"flip":false,"id":30},
            {"name":"nine","icon":"9","suit":"spades","value":9,"index":8,"flip":false,"id":34},
            {"name":"king","icon":"K","suit":"clubs","value":10,"index":12,"flip":false,"id":12},
            {"name":"two","icon":"2","suit":"diamonds","value":2,"index":1,"flip":true,"id":40},
        ]
    },
    {
        messages: [
            'Three or more sequential cards are a run.',
            'Runs are worth 1 point for each card they contain.',
            'This hand contains a run, a pair, and two fifteens!'
        ],
        hand: [
            {"name":"three","icon":"3","suit":"hearts","value":3,"index":2,"flip":false,"id":15},
            {"name":"king","icon":"K","suit":"spades","value":10,"index":12,"flip":false,"id":38},
            {"name":"four","icon":"4","suit":"spades","value":4,"index":3,"flip":false,"id":29},
            {"name":"king","icon":"K","suit":"clubs","value":10,"index":12,"flip":false,"id":12},
            {"name":"two","icon":"2","suit":"diamonds","value":2,"index":1,"flip":true,"id":40}
        ]
    },
    {
        messages: [
            'A common scoring combination in cribbage is to have a pair (or more) cards that can be counted in a run.',
            'This is called a double run!',
            'Since there are now two ways to make that run, we score 3 + 3 = 6 from runs...and 2 more from the pair!',
            'Experienced players will skip the math and just call it "a double run for 8", but for now, let\'s practice scoring each part of this double run.'
        ],
        hand: [
            {"name":"three","icon":"3","suit":"hearts","value":3,"index":2,"flip":false,"id":15},
            {"name":"ace","icon":"A","suit":"diamonds","value":1,"index":0,"flip":true,"id":39},
            {"name":"six","icon":"6","suit":"hearts","value":6,"index":5,"flip":false,"id":18},
            {"name":"two","icon":"2","suit":"hearts","value":2,"index":1,"flip":false,"id":14},
            {"name":"two","icon":"2","suit":"clubs","value":2,"index":1,"flip":false,"id":1},
        ]
    },
    {
        messages: [
            'OK, challenge time',
            'Here\'s a hand with runs, fifteens, and pairs!',
            'Remember, runs can be longer than three cards ;)'
        ],
        hand: [
            {"name":"six","icon":"6","suit":"clubs","value":6,"index":5,"flip":false,"id":5},
            {"name":"seven","icon":"7","suit":"hearts","value":7,"index":6,"flip":false,"id":19},
            {"name":"eight","icon":"8","suit":"hearts","value":8,"index":7,"flip":true,"id":20},
            {"name":"eight","icon":"8","suit":"diamonds","value":8,"index":7,"flip":false,"id":46},
            {"name":"nine","icon":"9","suit":"diamonds","value":9,"index":8,"flip":false,"id":47},
        ]
    },
    {
        messages: [
            'Just a couple more ways to score!',
            'If all four cards in your hand are the same suit, you score 4 points for the flush.',
            'If the flip card AND all the cards in your hand share a suit, you score 5 points.',
        ],
        hand: [
            {"name":"two","icon":"2","suit":"spades","value":2,"index":1,"flip":false,"id":27},
            {"name":"four","icon":"4","suit":"spades","value":4,"index":3,"flip":false,"id":29},
            {"name":"six","icon":"6","suit":"spades","value":6,"index":5,"flip":true,"id":31},
            {"name":"eight","icon":"8","suit":"spades","value":8,"index":7,"flip":false,"id":33},
            {"name":"queen","icon":"Q","suit":"spades","value":10,"index":11,"flip":false,"id":37},
        ]
    },
    {
        messages: [
            'However, if even one of the cards in your hand is not the same suit as the others, it doesn\'t count as a flush, regardless of the flip card',
            'Bummer.',
            '(When scoring the crib, it\'s also slightly different - the crib HAS to be a five-card flush.)',
        ],
        hand: [
            {"name":"two","icon":"2","suit":"spades","value":2,"index":1,"flip":false,"id":27},
            {"name":"eight","icon":"8","suit":"hearts","value":8,"index":7,"flip":false,"id":20},
            {"name":"six","icon":"6","suit":"spades","value":6,"index":5,"flip":true,"id":31},
            {"name":"eight","icon":"8","suit":"spades","value":8,"index":7,"flip":false,"id":33},
            {"name":"queen","icon":"Q","suit":"spades","value":10,"index":11,"flip":false,"id":37},
        ]
    },
    {
        messages: [
            'Almost there! Two more bonus ways to score: Nibs and Nobs',
            'When the flip card is a jack, the dealer automatically scores \'Nibs\', worth 2 points.',
            'However, ANYONE can score Nobs, if they hold the jack of the same suit as the flip card. Nobs is worth 1 point.',
            'For our purposes, we can count both Nibs and Nobs simply by tapping the flip card.'
        ],
        hand: [
            {"name":"two","icon":"2","suit":"spades","value":2,"index":1,"flip":false,"id":27},
            {"name":"eight","icon":"8","suit":"hearts","value":8,"index":7,"flip":false,"id":20},
            {"name":"six","icon":"6","suit":"spades","value":6,"index":5,"flip":true,"id":31},
            {"name":"eight","icon":"8","suit":"spades","value":8,"index":7,"flip":false,"id":33},
            {"name":"jack","icon":"J","suit":"spades","value":10,"index":10,"flip":false,"id":36},
        ]
    },
    {
        messages: [
            'Congratulations! Those are all the hand scoring methods of cribbage.',
            'Feel free to continue practicing counting points with random hands, or return to the main menu to try your hand at Cribbage Golf!',
        ],
        // hand: [
        //     {"name":"two","icon":"2","suit":"spades","value":2,"index":1,"flip":false,"id":27},
        //     {"name":"eight","icon":"8","suit":"hearts","value":8,"index":7,"flip":false,"id":20},
        //     {"name":"six","icon":"6","suit":"spades","value":6,"index":5,"flip":true,"id":31},
        //     {"name":"eight","icon":"8","suit":"spades","value":8,"index":7,"flip":false,"id":33},
        //     {"name":"jack","icon":"J","suit":"spades","value":10,"index":10,"flip":false,"id":36},
        // ]
    }
]

export default scenarios;