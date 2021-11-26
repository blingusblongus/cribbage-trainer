import scenarios from './tutorialScenarios.js';

function tutorialDetails(page){
    const details = {
        overlay: false
    };

    if(page){
        let index = page - 1;
        console.log('details in scenarios', details);
        return {overlay:true, ...scenarios[index]}
    }

    return details;
}
export default tutorialDetails;