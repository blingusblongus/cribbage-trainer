const singleHandCheck = (state = [], action) => {
    //actually sets scoringCombos to the whole object returned from /single
    switch (action.type) {
        case 'SET_COMBOS':
            console.log('resultObj', action.payload);
            // adds a 'found' property to each scoring combination
            // sets those scores in the reducer
            let result = {};
            for (let scoreType in action.payload.scores) {
                let typeOfScore = action.payload.scores[scoreType] || null;
                result[scoreType] = typeOfScore.map(score => {
                    //calculate points
                    let points = 0;
                    switch(scoreType){
                        case 'countFifteens':
                        case 'countPairs':
                            points = 2;
                            break;
                        case 'countRuns':
                        case 'countFlush':
                            points = score.length;
                            break;
                        case 'countNibsNobs':
                            console.log(score);
                            score.name === 'jack' ? points = 2 : points = 1;
                            break;
                    }


                    return {
                        combo: score,
                        found: false,
                        points: points
                    }
                });
            }
            return result;
        case 'MARK_FOUND':
            let scoreType = action.payload.scoreType;
            let index = action.payload.index;
            state[scoreType][index].found = true;
            return state;
        default:
            return state;
    }
}

export default singleHandCheck;