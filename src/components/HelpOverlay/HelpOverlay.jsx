import './HelpOverlay.css';

function HelpOverlay({ details, setDetails }) {
    return (
        <>
            {/* CONDITIONAL HELP OVERLAY */}
            <div className={
                details.overlay ?
                    "overlay-container" : "fade"
            }
                onClick={() => setDetails({ ...details, overlay: false })
                }>

                <div className="overlay"></div>

                <h3 className={details.overlay ?
                    "flashing dismiss-message" : "dismiss-message overlay fade"}>
                    Tap Anywhere to Dismiss
                </h3>
                
                <div className={details.overlay ?
                    "overlay-body" : "overlay-body fade"}>
                    {details.messages?.map((message, i) => {
                        return <p key={i}>{message}</p>;
                    })}
                </div>
            </div >
        </>
    )
}

export default HelpOverlay;