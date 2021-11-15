function CribbageGolf(props) {
    return (
        <>
            <div className="test-container">
                <button onClick={getResults}>GET</button>
                {/* <Scatter data={data} options={options} /> */}
            </div>
            <div className="hand-container">
                {deal.length > 1 && deal?.map(card => {
                    return <Card
                        key={card.id}
                        card={card}
                        send={send}
                        setSend={setSend} />
                })}
            </div>
        </>
    )
}

export default CribbageGolf;