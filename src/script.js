const header = document.getElementById('greeting')
const decks = document.getElementById('decks')
const deck_cards = document.getElementById('cards')
const main = document.getElementById('main')


document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/users/19")
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
    console.log(deck);
    let body = document.querySelector("body");
    body.innerHTML = "";

    let container = document.createElement('div');
    container.setAttribute("class","parent");

    let gameInfo = document.createElement('div');
    gameInfo.setAttribute("class","div1");

    let oppCard = document.createElement('div');
    oppCard.setAttribute("class","div2");
    
    let oppHealth = document.createElement('div');
    oppHealth.setAttribute("class","div3");
    
    let oppAttack = document.createElement('div');
    oppAttack.setAttribute("class","div4");
    
    let userCard = document.createElement('div');
    userCard.setAttribute("class","div5");
    
    let userHealth = document.createElement('div');
    userHealth.setAttribute("class","div6");
    
    let userAttack = document.createElement('div');
    userAttack.setAttribute("class","div7");
    
    let userHand1 = document.createElement('div');
    userHand1.setAttribute("class","div8");
    
    let userHand2 = document.createElement('div');
    userHand2.setAttribute("class","div9");
    
    let userHand3 = document.createElement('div');
    userHand3.setAttribute("class","div10");
    
    let userHand4 = document.createElement('div');
    userHand4.setAttribute("class","div11");
    
    let userHand5 = document.createElement('div');
    userHand5.setAttribute("class","div12");
    
    let userHand6 = document.createElement('div');
    userHand6.setAttribute("class","div13");

    container.append(gameInfo,oppCard,oppHealth,oppAttack,userCard,userHealth,userAttack,userHand1,userHand2,userHand3,userHand4,userHand5,userHand6);
    
    body.appendChild(container);
    
}