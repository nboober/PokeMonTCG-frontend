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

    let div1 = document.createElement('div');
    div1.setAttribute("class","div1");

    let div2 = document.createElement('div');
    div2.setAttribute("class","div2");
    
    let div3 = document.createElement('div');
    div3.setAttribute("class","div3");
    
    let div4 = document.createElement('div');
    div4.setAttribute("class","div4");
    
    let div5 = document.createElement('div');
    div5.setAttribute("class","div5");
    
    let div6 = document.createElement('div');
    div6.setAttribute("class","div6");
    
    let div7 = document.createElement('div');
    div7.setAttribute("class","div7");
    
    let div8 = document.createElement('div');
    div8.setAttribute("class","div8");
    
    let div9 = document.createElement('div');
    div9.setAttribute("class","div9");
    
    let div10 = document.createElement('div');
    div10.setAttribute("class","div10");
    
    let div11 = document.createElement('div');
    div11.setAttribute("class","div11");
    
    let div12 = document.createElement('div');
    div12.setAttribute("class","div12");
    
    let div13 = document.createElement('div');
    div13.setAttribute("class","div13");

    container.append(div1,div2,div3,div4,div5,div6,div7,div8,div9,div10,div11,div12,div13);
    
    body.appendChild(container);
    
}