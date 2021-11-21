function sortValueSuit(hand){
    hand.sort((a,b) => {
        return a.index - b.index;
    })
    hand.sort((a,b) => {
        return a.value - b.value;
    })
    return hand;
}

export default sortValueSuit;