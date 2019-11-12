//Gym Badges
const rockBadge = 'https://cdn.bulbagarden.net/upload/d/dd/Boulder_Badge.png'
const fireBadge = 'https://cdn.bulbagarden.net/upload/1/12/Volcano_Badge.png'
const waterBadge = 'https://cdn.bulbagarden.net/upload/9/9c/Cascade_Badge.png'
const thunderBadge = 'https://cdn.bulbagarden.net/upload/a/a6/Thunder_Badge.png'
const grassBadge = 'https://cdn.bulbagarden.net/upload/b/b5/Rainbow_Badge.png'
const psychicBadge = 'https://cdn.bulbagarden.net/upload/6/6b/Marsh_Badge.png'
const poisonBadge = 'https://cdn.bulbagarden.net/upload/7/7d/Soul_Badge.png'
const earthBadge = 'https://cdn.bulbagarden.net/upload/7/78/Earth_Badge.png'

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

    let container = document.createElement('div');
    container.classList.add("parent");

    let gameInfo = document.createElement('div');
    gameInfo.classList.add("div1");

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

    gameInfo.append(oppPokemonText,oppPokemonCount,userPokemonText,userPokemonCount,playByPlayContainer)

    let oppCard = document.createElement('div');
    oppCard.classList.add("div2");
    
    let oppHealth = document.createElement('div');
    oppHealth.classList.add("div3");
    //computerHPBar(oppHealth)
    
    let oppAttack = document.createElement('div');
    oppAttack.classList.add("div4");
    
    let userCard = document.createElement('div');
    userCard.classList.add("div5");
    
    let userHealth = document.createElement('div');
    userHealth.classList.add("div6");
   // myHPBar(userHealth)
    
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

    let playByPlay = document.querySelector('.playByPlay');
    let li = document.createElement('li');
    li.innerText = "User and Opponent Draw 6 Cards";
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
    event.target.remove();
    let id = event.target.id;
    
    fetch(`http://localhost:3000/cards/${id}`)
    .then(response => response.json())
    .then(card => {
        console.log(card);

        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.innerText = `User plays ${card.name}`;
        playByPlay.append(li);    
                
        let userPlayCardContainer = document.querySelector('.div5');
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
    li.innerText = `The opponent plays ${deck.cards[randNumber].name}`;
    playByPlay.append(li);   

    let oppCardContainer = document.querySelector(".div2");
    oppCardContainer.setAttribute('hp', deck.cards[randNumber].hp)
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

function attackOpp(card){
    console.log("user attacking");

    let attackDamage = parseInt(event.target.id);

    let oppCardHealth = document.querySelector('.div3');
    let oppCardHealthValue = parseInt(document.querySelector('.div3').innerText);

    updateCompHP(oppCardHealth, oppCardHealthValue, attackDamage)
    let currentHealth= Number(oppCardHealth.innerText.split("/")[0])

    let playByPlay = document.querySelector('.playByPlay');
    let li = document.createElement('li');
    let attackname = event.target.innerText.split(" - ")[0]
    li.innerText = `${card.name} attacks opponent with ${attackname} for ${attackDamage} damage`;
    playByPlay.append(li);   

    if(currentHealth <= 0){

        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.innerText = `The opponent's Pokemon Fainted!`;
        playByPlay.append(li);   

        let id = card.deck_id;
        let oppPokemonCount = document.getElementById("oppPokemonCount");
        oppCardHealth.innerHTML = ""
        let newCount = --oppRemainingPokemon;
        oppPokemonCount.innerText = newCount;

        let li2 = document.createElement('li');
        li2.innerText = `The User is down to ${newCount} Pokemon!`;
        playByPlay.append(li2);   

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
    let userCard = document.querySelector('.div5');
    let userCardHealth = document.querySelector('.div6');
    let userCardAttack = document.querySelector('.div7');
    let userCardHealthValue = parseInt(document.querySelector('.div6').innerText);
    let oppCardAttackContainer = document.querySelector('.div4');

    let oppCardAttack1 = parseInt(oppCardAttackContainer.firstChild.id);
    let oppCardAttack2 = parseInt(oppCardAttackContainer.lastChild.id);
    let randomAttack = Math.ceil(Math.random() * 2);

    let oppCardAttack = 0;

    if(randomAttack == 1){
        oppCardAttack = oppCardAttack1;
    }else if(randomAttack == 2){
        oppCardAttack = oppCardAttack2;
    }

    updateUserHP(userCardHealth, userCardHealthValue, oppCardAttack)
    let current_health = Number(userCardHealth.innerText.split("/")[0])
    if( current_health <= 0){

        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.innerText = `The User's Pokemon Fainted!`;
        playByPlay.append(li);   

        userCard.innerHTML = "";
        userCardHealth.innerHTML = "";
        userCardAttack.innerHTML = "";

        let userPokemonCount = document.getElementById("userPokemonCount");
        let newCount = --userRemainingPokemon;
        userPokemonCount.innerText = newCount;

        let li2 = document.createElement('li');
        li2.innerText = `The User is down to ${newCount} Pokemon!`;
        playByPlay.append(li2);   


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
    let new_health_value = userCardHealthValue - oppCardAttack
    let total_health_value = userCardHealthValue
    let new_percentage = (new_health_value / total_health_value) * 100
    healthBox.children[0].children[0].children[0].style.width = `${new_percentage}%`
    healthBox.getElementsByTagName('span')[0].innerText = `${new_health_value}/${total_health_value}`
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
    //debugger
    if (userFound) {
        console.log("succesful login")
        userShowPage(currentUser)
    } else {
        alert("User Not Found!")
    }
}




