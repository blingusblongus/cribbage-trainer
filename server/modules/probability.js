const probUtils = {
    checkProb: checkProb,
    analyzeProbs: analyzeProbs
}


function checkProb(possibleScores){
    for(score in possibleScores){
        possibleScores[score].probability = possibleScores[score].count / 46;
    }
}

function analyzeProbs(response){
    let possibleScores = response.possibleScores
    let sumScore = 0;
    let sumCount = 0;
    let maxScore = 0;
    let minScore = Infinity;
    let scoreArray = [];

    for(let scoreVal in possibleScores){
        // convert to integer
        scoreVal = parseInt(scoreVal)
        
        //update maxScore;
        if(scoreVal > maxScore) maxScore = scoreVal;

        //update minScore;
        if(scoreVal < minScore) minScore = scoreVal;
        
        //number of times specific
        let multiplier = possibleScores[scoreVal].count;

        //add all points for avg
        sumScore += multiplier * scoreVal;
        //keep track of total options
        sumCount += multiplier;

        //fill the score array
        for(let i=0; i<multiplier; i++){
            scoreArray.push(parseInt(scoreVal));
        }
    }

    const stats = {
        avg: sumScore / sumCount,
        max: maxScore,
        min: minScore,
        median: (scoreArray[22] + scoreArray[23]) / 2  
    }

    return stats;
}

module.exports = probUtils;