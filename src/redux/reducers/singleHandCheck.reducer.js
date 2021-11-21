const singleHandCheck = (state = [], action) => {
    //actually sets scoringCombos to the whole object returned from /single
    switch (action.type) {
        case 'SET_COMBOS':
            // adds a 'found' property to each scoring combination
            // sets those scores in the reducer
            let result = {};
            for (let scoreType in action.payload.scores) {
                let typeOfScore = action.payload.scores[scoreType] || null;
                result[scoreType] = typeOfScore.map(score => {
                    return {
                        combo: score,
                        found: false
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