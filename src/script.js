const header = document.getElementById('greeting')
const decks = document.getElementById('decks')
const deck_cards = document.getElementById('cards')

const main = document.getElementById('main')
document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/users/17")
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
            .then(deck => deck.cards.forEach(renderCards))
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