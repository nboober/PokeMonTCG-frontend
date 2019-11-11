const header = document.getElementById('greeting')
const decks = document.getElementById('decks')
const deckCards = document.getElementById('cards')
const currentDeck = document.getElementById('current-deck')
const gyms = Array.from(document.getElementsByClassName('gym'))
const backCardImg = "https://images.pokemontcg.io/xyp/XY154_hires.png"
const body = document.getElementsByTagName('body')[0]

const main = document.getElementById('main')
document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(user => userShowPage(user[0]))

    gyms.forEach(gym => {
    gym.addEventListener('click', () => {
        renderGymBoard()
    })
})

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
            currentDeck.innerText = `Currently Displaying: ${event.target.innerText}`
            deckCards.innerText = ""
            fetchDeck()
            .then(response => response.json())
            .then(deck => deck.cards.forEach(renderCards))
        })
    })
}

function renderCards (card) {
    const cardDiv = document.createElement('div');
    const image = document.createElement('img');
    image.classList.add('single-card');
    image.src = card.imageUrl
    cardDiv.appendChild(image);
    deckCards.appendChild(cardDiv)
}

function fetchDeck() {
    const deck_id = event.target.id.split("-")[1]
    return fetch(`http://localhost:3000/decks/${deck_id}`)
}

function renderGymBoard () {
    body.innerText = ''
    //create user hand/deck/active card
    //do the same for computer
}