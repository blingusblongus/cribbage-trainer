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
                    let name = '';
                    switch(scoreType){
                        case 'countFifteens':
                            name = 'Fifteen';
                            points = 2;
                            break;
                        case 'countPairs':
                            name = 'Pair'
                            points = 2;
                            break;
                        case 'countRuns':
                            name = 'Run';
                            points = score.length;
                            break;
                        case 'countFlush':
                            name = 'Flush';
                            points = score.length;
                            break;
                        case 'countNibsNobs':
                            score[0].name === 'jack' ? points = 2 : points = 1;
                            score[0].name === 'jack' ? name = 'Nibs' : name = 'Nobs';
                            break;
                    }

                    return {
                        name: name,
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