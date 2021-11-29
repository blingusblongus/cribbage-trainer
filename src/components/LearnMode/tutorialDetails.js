import { useHistory } from 'react-router';
import scenarios from './tutorialScenarios.js';

function tutorialDetails(page){
    const details = {
        overlay: false
    };

    // select the tutorial scenario that matches the page
    if(page){
        details.overlay = true;

        //If past the furthest tutorial, don't trigger overlay
        if(page > scenarios.length){
            details.overlay = false;
        }
        
        let index = page - 1;
        return {...details, ...scenarios[index]}
    }

    return details;
}
export default tutorialDetails;