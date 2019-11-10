const header = document.getElementById('greeting')
const decks = document.getElementById('decks')
const deck_cards = document.getElementById('cards')
const main = document.getElementById('main')


document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/users/1")
    .then(response => response.json())
    //.then(cards => cards.forEach(card => renderCard(card)))
    .then(card => userShowPage(card))

})

function userShowPage(user) {
    header.innerText = `Welcome! ${user.name}`
    const decksList = document.createElement('ul')
    user.decks.forEach(deck => {
        const user_deck = document.createElement('li');
        user_deck.innerText = deck.name;
        user_deck.id = `deck-${deck.id}`
        decksList.appendChild(user_deck)
        decks.appendChild(decksList)
        user_deck.addEventListener('click', () => {
            fetchDeck()
            .then(response => response.json())
            .then(deck => {

                let playButton = document.createElement('button');
                playButton.innerText = "PLAY";
                playButton.addEventListener('click',function(){
                    playGame(deck)
                })
            
                main.appendChild(playButton);
            
                deck.cards.forEach(renderCards)

            })
            //.then(cards => console.log(cards))
        })
        
    })


}

function renderCards (card) {
   // main.appendChild(header)
    // const carDiv = document.createElement('div');

    const image = document.createElement('img');
    image.src = card.imageUrl
    // carDiv.appendChild(image);
    deck_cards.appendChild(image)
}

function fetchDeck() {
    const deck_id = event.target.id.split("-")[1]
    return fetch(`http://localhost:3000/decks/${deck_id}`)
}

function playGame(deck){
    // console.log(deck);
    let body = document.querySelector("body");
    body.innerHTML = "";

    let container = document.createElement('div');
    container.classList.add("parent");

    let gameInfo = document.createElement('div');
    gameInfo.classList.add("div1");

    let oppCard = document.createElement('div');
    oppCard.classList.add("div2");
    
    let oppHealth = document.createElement('div');
    oppHealth.classList.add("div3");
    
    let oppAttack = document.createElement('div');
    oppAttack.classList.add("div4");
    
    let userCard = document.createElement('div');
    userCard.classList.add("div5");
    
    let userHealth = document.createElement('div');
    userHealth.classList.add("div6");
    
    let userAttack = document.createElement('div');
    userAttack.classList.add("div7");
    
    let userHand1 = document.createElement('div');
    userHand1.classList.add("div8");
    
    let userHand2 = document.createElement('div');
    userHand2.classList.add("div9");
    
    let userHand3 = document.createElement('div');
    userHand3.classList.add("div10");
    
    let userHand4 = document.createElement('div');
    userHand4.classList.add("div11");
    
    let userHand5 = document.createElement('div');
    userHand5.classList.add("div12");
    
    let userHand6 = document.createElement('div');
    userHand6.classList.add("div13");

    container.append(gameInfo,oppCard,oppHealth,oppAttack,userCard,userHealth,userAttack,userHand1,userHand2,userHand3,userHand4,userHand5,userHand6);
    
    body.appendChild(container);
    
    drawCards(deck);

}

function drawCards(deck){
    console.log(deck);

    let randNumber1 = Math.floor(Math.random() * 60);
    let randNumber2 = Math.floor(Math.random() * 60);
    let randNumber3 = Math.floor(Math.random() * 60);
    let randNumber4 = Math.floor(Math.random() * 60);
    let randNumber5 = Math.floor(Math.random() * 60);
    let randNumber6 = Math.floor(Math.random() * 60);

    let hand1 = document.querySelector(".div8");
    let cardContainer1 = document.createElement("img"); 
    let cardImage1 = deck.cards[randNumber1].imageUrl;
    let cardId1 = deck.cards[randNumber1].id;
    cardContainer1.id = cardId1;
    cardContainer1.src = cardImage1;
    hand1.appendChild(cardContainer1);
    cardContainer1.addEventListener("click", playCard);
    
    let hand2 = document.querySelector(".div9");
    let cardContainer2 = document.createElement("img"); 
    let cardImage2 = deck.cards[randNumber2].imageUrl;
    let cardId2 = deck.cards[randNumber2].id;
    cardContainer2.id = cardId2;
    cardContainer2.src = cardImage2;
    hand2.appendChild(cardContainer2);
    cardContainer2.addEventListener("click", playCard);
    
    let hand3 = document.querySelector(".div10");
    let cardContainer3 = document.createElement("img"); 
    let cardImage3 = deck.cards[randNumber3].imageUrl;
    let cardId3 = deck.cards[randNumber3].id;
    cardContainer3.id = cardId3;
    cardContainer3.src = cardImage3;
    hand3.appendChild(cardContainer3);
    cardContainer3.addEventListener("click", playCard);
    
    let hand4 = document.querySelector(".div11");
    let cardContainer4 = document.createElement("img"); 
    let cardImage4 = deck.cards[randNumber4].imageUrl;
    let cardId4 = deck.cards[randNumber4].id;
    cardContainer4.id = cardId4;
    cardContainer4.src = cardImage4;
    hand4.appendChild(cardContainer4);
    cardContainer4.addEventListener("click", playCard);
    
    let hand5 = document.querySelector(".div12");
    let cardContainer5 = document.createElement("img"); 
    let cardImage5 = deck.cards[randNumber5].imageUrl;
    let cardId5 = deck.cards[randNumber5].id;
    cardContainer5.id = cardId5;
    cardContainer5.src = cardImage5;
    hand5.appendChild(cardContainer5);
    cardContainer5.addEventListener("click", playCard);
    
    let hand6 = document.querySelector(".div13");
    let cardContainer6 = document.createElement("img"); 
    let cardImage6 = deck.cards[randNumber6].imageUrl;
    let cardId6 = deck.cards[randNumber6].id;
    cardContainer6.id = cardId6;
    cardContainer6.src = cardImage6;
    hand6.appendChild(cardContainer6);
    cardContainer6.addEventListener("click", playCard);
    
}

function playCard(){
    
    let id = event.target.id;
    fetch(`http://localhost:3000/cards/${id}`)
    .then(response => response.json())
    .then(card => {
        console.log(card);
        debugger
    })
}