const ShuffleCards =(cards)=>{

    let cardCount = cards.length;

    for(let i=0 ; i<cardCount ; i++){
        let randomPosition = Math.floor(Math.random() * (cardCount - i));
        let temp = cards[i];
        cards[i] = cards[randomPosition];
        cards[randomPosition] = temp; 
    }
    return cards;
}

export {ShuffleCards};