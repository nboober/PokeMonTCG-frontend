const main = document.getElementById('main')
document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(cards => cards.forEach(card => renderCard(card)))
})


function renderCard (card) {
    const carDiv = document.createElement('div');
    const image = document.createElement('img');
    image.src = card.imageUrl
    carDiv.appendChild(image);
    main.appendChild(carDiv)
}