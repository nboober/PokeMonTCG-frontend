//Gym Badges
const rockBadge = 'https://cdn.bulbagarden.net/upload/d/dd/Boulder_Badge.png'
const fireBadge = 'https://cdn.bulbagarden.net/upload/1/12/Volcano_Badge.png'
const waterBadge = 'https://cdn.bulbagarden.net/upload/9/9c/Cascade_Badge.png'
const thunderBadge = 'https://cdn.bulbagarden.net/upload/a/a6/Thunder_Badge.png'
const grassBadge = 'https://cdn.bulbagarden.net/upload/b/b5/Rainbow_Badge.png'
const psychicBadge = 'https://cdn.bulbagarden.net/upload/6/6b/Marsh_Badge.png'
const poisonBadge = 'https://cdn.bulbagarden.net/upload/7/7d/Soul_Badge.png'
const earthBadge = 'https://cdn.bulbagarden.net/upload/7/78/Earth_Badge.png'
const genericBadge = 'https://img.rankedboost.com/wp-content/uploads/2016/07/Pokemon-Go-Pok%C3%A9dex.png'

//Gym Backgrounds
let currentGym;
let currentBadge;
const generic = 'https://images7.alphacoders.com/592/thumb-1920-592678.jpg'
const rock = 'https://cdn.bulbagarden.net/upload/3/3b/Cyllage_Gym_anime.png'
const fire = 'https://i2.wp.com/www.puclpodcast.com/wp-content/uploads/2017/08/pokemon-59-07.png?ssl=1'
const water = 'https://cdn.bulbagarden.net/upload/a/aa/Cerulean_Gym_Battlefield_Water.png'
const thunder = "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-lets-go-pikachu-eevee/b/bd/Screen_Shot_2018-11-20_at_2.14.34_AM.jpg?width=1600"
const grass = 'https://cdn.bulbagarden.net/upload/7/79/Coumarine_Gym_battlefield.png'
const poison = 'https://www.dailydot.com/wp-content/uploads/6be/6b/2eacbc39866d37fc53383ab86cf69b09.jpg'
const psychic = 'https://i.ytimg.com/vi/b73KO2sHE74/maxresdefault.jpg'
const psych = 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-lets-go-pikachu-eevee/c/cf/Screen_Shot_2018-11-30_at_2.35.12_PM.jpg?width=1280'
const earth = 'https://cdn.bulbagarden.net/upload/7/7b/Driftveil_Gym_anime.png'

//Page elements
let currentUser;
const htmlDoc = document.getElementsByTagName('html')[0]
const loginDiv = document.getElementById('login-logo-div')
const loginForm = document.getElementById('login-form')
const header = document.getElementById('greeting')
const decks = document.getElementById('decks')
const deckCards = document.getElementById('cards')
const currentDeck = document.getElementById('current-deck')
const gyms = Array.from(document.getElementsByClassName('gym'))
const backCardImg = "https://images.pokemontcg.io/xyp/XY154_hires.png"
const body = document.getElementsByTagName('body')[0]
const sidebar = document.getElementsByClassName('sidenav')[0]
const main = document.getElementById('main')


document.addEventListener('DOMContentLoaded', () => {
    
    loginForm.addEventListener('submit', login)

//     fetch("http://localhost:3000/users")
//     .then(response => response.json())
//     .then(user => {
        
//         userShowPage(user[0])
//     })

//     gyms.forEach(gym => {
//     gym.addEventListener('click', () => {
//         renderGymBoard()
//     })
// })

})
var oppRemainingPokemon = 6;
var userRemainingPokemon = 6;

function userShowPage(user) {
    body.removeAttribute('style')
    sidebar.removeAttribute('hidden')
    htmlDoc.style.display = "inline";
    body.style.display = "inline";
    // body.style.backkgroundImage = none;
    loginDiv.classList.add("login")
    main.removeAttribute('hidden')
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
            .then(deck => {
                gymLinks(deck)
                let playButton = document.createElement('button');
                playButton.innerText = "PLAY";
                playButton.addEventListener('click',function(){
                    playGame(deck)
                })
        
        if(sidebar.lastElementChild.toString() === "[object HTMLButtonElement]"){
            sidebar.lastElementChild.remove();
        }
                sidebar.appendChild(playButton);
            
                deck.cards.forEach(renderCards)

            })
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

function playGame(deck){
    body.innerHTML = "";
    currentGym = event.target.classList[1];
    setGym()
    change(currentGym)
    let container = document.createElement('div');
    container.classList.add("parent");

    let gameInfo = document.createElement('div');
    gameInfo.classList.add("div1");
    gameInfo.classList.add("black-background");

    let oppPokemonText = document.createElement('p');
    oppPokemonText.innerText = "Opponent's Pokemon Remaining: "
    let oppPokemonCount = document.createElement('p');
    oppPokemonCount.id = "oppPokemonCount";
    oppPokemonCount.innerText = oppRemainingPokemon;
    
    let userPokemonText = document.createElement('p');
    userPokemonText.innerText = "\nUser's Pokemon Remaining: "
    let userPokemonCount = document.createElement('p');
    userPokemonCount.id = "userPokemonCount";
    userPokemonCount.innerText = userRemainingPokemon;

    let playByPlayContainer = document.createElement("div");
    playByPlayContainer.classList.add('playByPlayContainer');
    let playByPlay = document.createElement("ul");
    playByPlay.classList.add('playByPlay');
    playByPlayContainer.append(playByPlay);

    window.setInterval(function() {
        playByPlayContainer.scrollTop = playByPlayContainer.scrollHeight;
      }, 3000);

    gameInfo.append(oppPokemonText,oppPokemonCount,userPokemonText,userPokemonCount,playByPlayContainer)

    let oppCard = document.createElement('div');
    oppCard.classList.add("div2");
    
    let oppHealth = document.createElement('div');
    oppHealth.classList.add("div3");
    oppHealth.classList.add("black-background");
    //computerHPBar(oppHealth)
    
    let oppAttack = document.createElement('div');
    oppAttack.classList.add("div4");
    oppAttack.classList.add("black-background");

    let userCard = document.createElement('div');
    userCard.classList.add("div5");
    
    let userHealth = document.createElement('div');
    userHealth.classList.add("div6");
    userHealth.classList.add("black-background");
   // myHPBar(userHealth)
    
    let userAttack = document.createElement('div');
    userAttack.classList.add("div7");
    userAttack.classList.add("black-background");
    
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

    const badgeDiv = document.createElement('div');
    badgeDiv.id = 'badge-div'
    const badgePic = document.createElement('img');
    badgePic.src = currentBadge;
    badgeDiv.appendChild(badgePic);
    body.appendChild(badgeDiv)

    container.append(gameInfo,oppCard,oppHealth,oppAttack,userCard,userHealth,userAttack,userHand1,userHand2,userHand3,userHand4,userHand5,userHand6);
    
    body.appendChild(container);
    
    drawCards(deck);

}

function drawCards(deck){
    console.log(deck);

    let playByPlay = document.querySelector('.playByPlay');
    let li = document.createElement('li');
    li.innerText = "The User and Opponent Draw 6 Cards";
    playByPlay.append(li);

    let userPlayCardContainer = document.querySelector('.div5');

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
    if(userPlayCardContainer.children.length === 0){
        cardContainer1.addEventListener("click", playCard);
    }    

    let hand2 = document.querySelector(".div9");
    let cardContainer2 = document.createElement("img"); 
    let cardImage2 = deck.cards[randNumber2].imageUrl;
    let cardId2 = deck.cards[randNumber2].id;
    cardContainer2.id = cardId2;
    cardContainer2.src = cardImage2;
    hand2.appendChild(cardContainer2);
    if(userPlayCardContainer.innerHTML == ""){
        cardContainer2.addEventListener("click", playCard);
    }

    let hand3 = document.querySelector(".div10");
    let cardContainer3 = document.createElement("img"); 
    let cardImage3 = deck.cards[randNumber3].imageUrl;
    let cardId3 = deck.cards[randNumber3].id;
    cardContainer3.id = cardId3;
    cardContainer3.src = cardImage3;
    hand3.appendChild(cardContainer3);
    if(userPlayCardContainer.innerHTML == ""){
        cardContainer3.addEventListener("click", playCard);
    }

    let hand4 = document.querySelector(".div11");
    let cardContainer4 = document.createElement("img"); 
    let cardImage4 = deck.cards[randNumber4].imageUrl;
    let cardId4 = deck.cards[randNumber4].id;
    cardContainer4.id = cardId4;
    cardContainer4.src = cardImage4;
    hand4.appendChild(cardContainer4);
    if(userPlayCardContainer.innerHTML == ""){
        cardContainer4.addEventListener("click", playCard);
    }

    let hand5 = document.querySelector(".div12");
    let cardContainer5 = document.createElement("img"); 
    let cardImage5 = deck.cards[randNumber5].imageUrl;
    let cardId5 = deck.cards[randNumber5].id;
    cardContainer5.id = cardId5;
    cardContainer5.src = cardImage5;
    hand5.appendChild(cardContainer5);
    if(userPlayCardContainer.innerHTML == ""){
        cardContainer5.addEventListener("click", playCard);
    }

    let hand6 = document.querySelector(".div13");
    let cardContainer6 = document.createElement("img"); 
    let cardImage6 = deck.cards[randNumber6].imageUrl;
    let cardId6 = deck.cards[randNumber6].id;
    cardContainer6.id = cardId6;
    cardContainer6.src = cardImage6;
    hand6.appendChild(cardContainer6);
    cardContainer6.addEventListener("click", playCard);

    playEnemyCard(deck);
}

function playCard(){
    let parent = event.target.parentElement;
    event.target.remove();
    let id = event.target.id;

    let oppCardContainer = document.querySelector(".div5");
    if(oppCardContainer.childElementCount){
        let swappedPokemonId = oppCardContainer.firstElementChild.id;
        
        swapPokemon(parent, swappedPokemonId);
    }
    
    fetch(`http://localhost:3000/cards/${id}`)
    .then(response => response.json())
    .then(card => {
        console.log(card);

        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.classList.add("userPlays")
        li.innerText = `User plays ${card.name}`;
        playByPlay.append(li);    
                
        let userPlayCardContainer = document.querySelector('.div5');
        userPlayCardContainer.setAttribute('hp', card.hp)
        userPlayCardContainer.innerHTML = "";
        let userPlayCard = document.createElement("img"); 
        let cardImage1 = card.imageUrl;
        let cardId1 = card.id;
        userPlayCard.id = cardId1;
        userPlayCard.src = cardImage1;
        userPlayCardContainer.appendChild(userPlayCard);
        
        let userCardHealth = document.querySelector('.div6');
        userCardHealth.innerHTML = "";
        let userCardAttack = document.querySelector('.div7');

        let healthDiv = document.createElement('div');
        myHPBar(healthDiv, card)
        let hp = document.createElement('span');
        hp.innerText = `${card.hp}/${card.hp}`
        healthDiv.appendChild(hp)


        
        userCardHealth.appendChild(healthDiv);
        userCardAttack.innerText = `${card.attack_name} - ${card.attack_damage} damage`;
        userCardAttack.innerHTML = "";
        let attack1 = document.createElement('p');
        attack1.id = card.attack_damage;

        let attack2 = document.createElement('p');
        attack2.id = card.attack_damage_2;
        
        attack1.innerText = `${card.attack_name} - ${card.attack_damage} damage`;
        if(card.attack_name_2 != null){
            attack2.innerText = `${card.attack_name_2} - ${card.attack_damage_2} damage`;
            userCardAttack.append(attack1,attack2);
        }else{
            userCardAttack.append(attack1);
        }

        attack1.addEventListener("click", function(){
            attackOpp(card);
        });
        attack2.addEventListener("click", function(){
            attackOpp(card);
        });

})}

function playEnemyCard(deck){
    let randNumber = Math.floor(Math.random() * 60);

    let playByPlay = document.querySelector('.playByPlay');
    let li = document.createElement('li');
    li.classList.add("oppPlays")
    li.innerText = `The opponent plays ${deck.cards[randNumber].name}`;
    playByPlay.append(li);   

    let oppCardContainer = document.querySelector(".div2");
    oppCardContainer.setAttribute('hp', deck.cards[randNumber].hp)
    oppCardContainer.setAttribute('name', deck.cards[randNumber].name)
    oppCardContainer.innerHTML = "";
    let cardImageTag = document.createElement("img"); 
    let cardImage = deck.cards[randNumber].imageUrl;
    let cardId = deck.cards[randNumber].id;
    cardImageTag.id = cardId;
    cardImageTag.src = cardImage;
    oppCardContainer.appendChild(cardImageTag);

    let oppCardHealth = document.querySelector('.div3');
    let oppCardAttack = document.querySelector('.div4');
    oppCardAttack.id = deck.cards[randNumber].attack_damage;
    computerHPBar(oppCardHealth, deck.cards[randNumber])
    oppCardAttack.innerText = `${deck.cards[randNumber].attack_name} - ${deck.cards[randNumber].attack_damage} damage`;

    oppCardAttack.innerHTML = "";

    let attack1 = document.createElement('p');
    attack1.classList.add("attack1");

    let attack2 = document.createElement('p');
    attack2.classList.add("attack2");
    
    attack1.innerText = `${deck.cards[randNumber].attack_name} - ${deck.cards[randNumber].attack_damage} damage`;
    attack1.id = deck.cards[randNumber].attack_damage;
    
    if(deck.cards[randNumber].attack_name_2 != null){
        attack2.innerText = `${deck.cards[randNumber].attack_name_2} - ${deck.cards[randNumber].attack_damage_2} damage`;
        attack2.id = deck.cards[randNumber].attack_damage_2;

        oppCardAttack.append(attack1,attack2);
    }else{
        oppCardAttack.append(attack1);
    }
}

function swapPokemon(parent,id){
    
    console.log("Pokemon swapped");
    fetch(`http://localhost:3000/cards/${id}`)
    .then(response => response.json())
    .then(card => {
        let cardContainer = document.createElement("img"); 
        let cardImage = card.imageUrl;
        let cardId = card.id;
        cardContainer.id = cardId;
        cardContainer.src = cardImage;
        parent.appendChild(cardContainer);
        
        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.classList.add("userPlays");
        li.innerText = `${card.name} has been taken out of play.`;
        playByPlay.append(li);       

        cardContainer.addEventListener("click", playCard);
    })
}

function attackOpp(card){
    console.log("user attacking");

    let attackDamage = parseInt(event.target.id);

    let oppCardHealth = document.querySelector('.div3');
    let oppCardHealthValue = parseInt(document.querySelector('.div3').innerText);

    updateCompHP(oppCardHealth, oppCardHealthValue, attackDamage)
    let currentHealth= Number(oppCardHealth.innerText.split("/")[0])

    let playByPlay = document.querySelector('.playByPlay');
    let li = document.createElement('li');
    li.classList.add("userPlays");
    let attackname = event.target.innerText.split(" - ")[0]
    li.innerText = `${card.name} attacks opponent with ${attackname} for ${attackDamage} damage`;
    playByPlay.append(li);   

    if(currentHealth <= 0){

        let li2 = document.createElement('li');
        li2.classList.add("oppPlays")
        li2.innerText = `The opponent's Pokemon Fainted!`;
        playByPlay.append(li2);   

        let id = card.deck_id;
        let oppPokemonCount = document.getElementById("oppPokemonCount");
        oppCardHealth.innerHTML = ""
        let newCount = --oppRemainingPokemon;
        oppPokemonCount.innerText = newCount;

        let li3 = document.createElement('li');
        li3.classList.add("oppPlays")
        li3.innerText = `The Opponent is down to ${newCount} Pokemon!`;
        playByPlay.append(li3);   

        if(oppPokemonCount.innerText == 0){
            win();
        }

        fetch(`http://localhost:3000/decks/${id}`)
        .then(response => response.json())
        .then(deck => {
            playEnemyCard(deck);
        })

    }else{
        oppAttackUser();
    }
}

function oppAttackUser(){
    console.log("opponent attacking");
    let oppCard = document.querySelector('.div2');
    let userCard = document.querySelector('.div5');
    let userCardHealth = document.querySelector('.div6');
    let userCardAttack = document.querySelector('.div7');
    let userCardHealthValue = parseInt(document.querySelector('.div6').innerText);
    let oppCardAttackContainer = document.querySelector('.div4');

    let oppCardAttack1 = parseInt(oppCardAttackContainer.firstChild.id);
    let oppCardAttack2 = parseInt(oppCardAttackContainer.lastChild.id);
    let randomAttack = Math.ceil(Math.random() * 2);

    let pokemonName = oppCard.getAttribute("name");
    let oppCardAttack = 0;
    let attackname;

    if(randomAttack == 1){
        oppCardAttack = oppCardAttack1;
        attackname = oppCardAttackContainer.firstChild.innerText.split(" - ")[0]
    }else if(randomAttack == 2){
        oppCardAttack = oppCardAttack2;
        attackname = oppCardAttackContainer.lastChild.innerText.split(" - ")[0]
    }

    updateUserHP(userCardHealth, userCardHealthValue, oppCardAttack)
    let current_health = Number(userCardHealth.innerText.split("/")[0])

    let playByPlay = document.querySelector('.playByPlay');
    let li = document.createElement('li');
    li.classList.add("oppPlays")
    li.innerText = `The Opponent's ${pokemonName} attacked the user with ${attackname} for ${oppCardAttack} damage!`;
    playByPlay.append(li);   


    if( current_health <= 0){

        let li2 = document.createElement('li');
        li2.classList.add("userPlays");
        li2.innerText = `The User's Pokemon Fainted!`;
        playByPlay.append(li2);   

        userCard.innerHTML = "";
        userCardHealth.innerHTML = "";
        userCardAttack.innerHTML = "";

        let userPokemonCount = document.getElementById("userPokemonCount");
        let newCount = --userRemainingPokemon;
        userPokemonCount.innerText = newCount;

        let li3 = document.createElement('li');
        li3.classList.add("userPlays");
        li3.innerText = `The User is down to ${newCount} Pokemon!`;
        playByPlay.append(li3);   


        if(userPokemonCount.innerText == 0){
            lose();
        }
    }
}

function win(){
    confirm("You Won!!!")
    document.location.reload()
}

function lose(){
    confirm("You Lose :(")
    document.location.reload()
}

function myHPBar(healthBox) {
    const progressBarContainer = document.createElement('div')
    progressBarContainer.classList.add('progress')
    const hpBar = document.createElement('div');
    hpBar.style.width = "100%"
    hpBar.classList.add('progress-bar');
    hpBar.classList.add('progress-bar-striped');

    progressBarContainer.appendChild(hpBar)
    healthBox.appendChild(progressBarContainer)
}

function computerHPBar(healthBox, card) {
    const progressBarContainer = document.createElement('div')
    const hp = document.createElement('span')
    hp.innerText = `${card.hp}/${card.hp}`



    progressBarContainer.classList.add('progress')
    const hpBar = document.createElement('div');
    hpBar.style.width = "100%"

    hpBar.classList.add('progress-bar');
    hpBar.classList.add('progress-bar-striped');
    hpBar.classList.add('bg-danger');

    progressBarContainer.appendChild(hpBar)
    healthBox.appendChild(progressBarContainer)
    healthBox.appendChild(hp)
}

function updateCompHP(healthBox, oppCardHealthValue, userCardAttack) {
    let oppHp = healthBox.previousElementSibling.getAttribute("hp")
    let new_health_value = oppCardHealthValue - userCardAttack
    let new_percentage = (new_health_value / oppHp) * 100
    
    healthBox.children[0].children[0].style.width = `${new_percentage}%`
    healthBox.getElementsByTagName('span')[0].innerText = `${new_health_value}/${oppHp}`
}

function updateUserHP(healthBox, userCardHealthValue, oppCardAttack) {
    let userHp = healthBox.previousElementSibling.getAttribute('hp');
    let new_health_value = userCardHealthValue - oppCardAttack
    let new_percentage = (new_health_value / userHp) * 100
    healthBox.children[0].children[0].children[0].style.width = `${new_percentage}%`
    healthBox.getElementsByTagName('span')[0].innerText = `${new_health_value}/${userHp}`
}

// function turnWait() {
//     alert('Next Turn!')    HAVE YET TO USE THIS
// }

function login() {
    event.preventDefault()
    console.log("helo")
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => checkUsers(users, username, password))
}

function checkUsers(users, username, password) {
    let userFound = false
    users.forEach(user => {
        if (user.username === username && user.password === password) {
            currentUser = user;
            userFound = true;
        }
    })
    if (userFound) {
        console.log("succesful login")
        userShowPage(currentUser)
    } else {
        alert("User Not Found!")
    }
}

function change(gym) {
    body.style.backgroundImage = `url(${gym})`
}

function gymLinks(deck) {
    gyms.forEach(gym => {
        gym.addEventListener('click', () => {
            playGame(deck)
        })
    })
}

function setGym() {
    switch (currentGym) {
        case 'rock':
            currentGym = rock;
            currentBadge = rockBadge;
            break;
        case 'fire':
            currentGym = fire;
            currentBadge = fireBadge;
            break;
        case 'water':
            currentGym = water;
            currentBadge = waterBadge;
            break;
        case 'electric':
            currentGym = thunder;
            currentBadge = thunderBadge;
            break;
        case 'grass':
            currentGym = grass;
            currentBadge = grassBadge;
            break;
        case 'poison':
            currentGym = poison;
            currentBadge = poisonBadge;
            break;
        case 'psychic':
            currentGym = psychic;
            currentBadge = psychicBadge;
            break;
        case 'ground':
            currentGym = earth;
            currentBadge = earthBadge;
            break;
        default:
            currentGym = generic;
            currentBadge = genericBadge;
    }
}

