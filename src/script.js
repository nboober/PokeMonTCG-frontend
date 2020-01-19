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
let gymDeckId;
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
const banner = document.getElementById('banner')
const myBadges = document.getElementById('my-badges')
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
const main = document.getElementById('main');
const modalBody = document.getElementsByClassName('modal-body')[0];
const createDeckBtn = document.getElementById('create-button')

document.addEventListener('DOMContentLoaded', () => {  
    loginForm.addEventListener('submit', login)
})
var oppRemainingPokemon = 6;
var userRemainingPokemon = 6;

function updateUser(user, deck) {
    fetch(`https://tcg-back.herokuapp.com/users/${user.id}`)
    .then(response => response.json())
    .then(user => {
        userShowPage(user)
        cards.innerText = ""
        deck.cards.forEach(card => renderCards(card))
    })

}

function welcomeAlert(){
    swal({
        title: "How to Log In",
        text: "Login with the following credentials: \n password: poke, username: nboober",
        icon: "info",
        button: "Got It!"
      });
}

function userShowPage(user) {
    body.removeAttribute('style')
    sidebar.removeAttribute('hidden')
    htmlDoc.style.display = "inline";
    body.style.display = "inline";
    loginDiv.classList.add("login")
    main.removeAttribute('hidden')
    myWonBadges()
    header.innerText = `Welcome ${user.name}!`
    createDeckBtn.addEventListener('click', renderForm)
    user.decks.forEach(deck => {
        const user_deck = document.createElement('li');
        user_deck.innerText = deck.name;
        user_deck.id = `deck-${deck.id}`
        decks.appendChild(user_deck)
        user_deck.addEventListener('click', () => {
            currentDeck.innerText = `Currently Displaying: ${event.target.innerText}`
            deckCards.innerText = ""
            fetchDeck()
            .then(response => response.json())
            .then(deck => {
                gymLinks(deck)
                let playButton = document.createElement('button');
                playButton.innerText = "Training";
                playButton.classList.add("red_button")
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
    cardDiv.setAttribute('data-toggle', "modal");
    cardDiv.setAttribute('data-target', "#exampleModal");
    cardDiv.addEventListener('click', displayCard)
}

function fetchDeck() {
    const deck_id = event.target.id.split("-")[1]
    return fetch(`https://tcg-back.herokuapp.com/decks/${deck_id}`)
}

function playGame(deck){
    body.innerHTML = "";

    let pokemonTheme = new Audio("Pokemon-Theme-Song.mp3");
    pokemonTheme.play()

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
    userPokemonText.innerText = "User's Pokemon Remaining: "
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

    let drawDiv = document.createElement('div');
    drawDiv.classList.add("div14");
    let image = document.createElement("img");
    image.src = backCardImg;
    drawDiv.appendChild(image);
    image.addEventListener("click", function(){
        drawNewCard(deck);
    })

    const badgeDiv = document.createElement('div');
    badgeDiv.id = 'badge-div'
    const badgePic = document.createElement('img');
    badgePic.src = currentBadge;
    badgeDiv.appendChild(badgePic);
    body.appendChild(badgeDiv)

    container.append(gameInfo,oppCard,oppHealth,oppAttack,userCard,userHealth,userAttack,userHand1,userHand2,userHand3,userHand4,userHand5,userHand6,drawDiv);
    
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
    cardContainer1.setAttribute("health", deck.cards[randNumber1].hp);
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
    cardContainer2.setAttribute("health", deck.cards[randNumber2].hp);
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
    cardContainer3.setAttribute("health", deck.cards[randNumber3].hp);
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
    cardContainer4.setAttribute("health", deck.cards[randNumber4].hp);
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
    cardContainer5.setAttribute("health", deck.cards[randNumber5].hp);
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
    cardContainer6.setAttribute("health", deck.cards[randNumber6].hp);
    let cardImage6 = deck.cards[randNumber6].imageUrl;
    let cardId6 = deck.cards[randNumber6].id;
    cardContainer6.id = cardId6;
    cardContainer6.src = cardImage6;
    hand6.appendChild(cardContainer6);
    cardContainer6.addEventListener("click", playCard);

    if(!gymDeckId){
        playEnemyCard(deck);
    }else{
        fetchGymDeck();
    }
}

function playCard(){
    let parent = event.target.parentElement;
    let health = event.target.getAttribute("health");
    event.target.remove();
    let id = event.target.id;

    let oppCardContainer = document.querySelector(".div5");
    if(oppCardContainer.childElementCount){
        let swappedPokemonId = oppCardContainer.firstElementChild.id;
        let health = oppCardContainer.firstElementChild.getAttribute("health");
        
        swapPokemon(parent, swappedPokemonId, health);
    }
    
    fetch(`https://tcg-back.herokuapp.com/cards/${id}`)
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
        userPlayCard.setAttribute("health", health);
        let cardImage1 = card.imageUrl;
        let cardId1 = card.id;
        userPlayCard.id = cardId1;
        userPlayCard.src = cardImage1;
        userPlayCardContainer.appendChild(userPlayCard);
        
        let userCardHealth = document.querySelector('.div6');
        userCardHealth.innerHTML = "";
        let userCardAttack = document.querySelector('.div7');

        let healthDiv = document.createElement('div');
        myHPBar(healthDiv, card, health)
        let hp = document.createElement('span');
        hp.innerText = `${health}/${card.hp}`
        healthDiv.appendChild(hp)

        userCardHealth.appendChild(healthDiv);

        userCardAttack.innerText = `${card.attack_name} - ${card.attack_damage} damage`;
        userCardAttack.innerHTML = "";
        let attack1 = document.createElement('p');
        attack1.id = card.attack_damage;

        let attack2 = document.createElement('p');
        attack2.id = card.attack_damage_2;
        
        attack1.innerText = `${card.attack_name} - ${card.attack_damage} damage`;
        if(card.attack_name_2 != "No Attack"){
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
    
    if(deck.cards[randNumber].attack_name_2 != "No Attack"){
        attack2.innerText = `${deck.cards[randNumber].attack_name_2} - ${deck.cards[randNumber].attack_damage_2} damage`;
        attack2.id = deck.cards[randNumber].attack_damage_2;

        oppCardAttack.append(attack1,attack2);
    }else{
        oppCardAttack.append(attack1);
    }
}

function swapPokemon(parent, id, health){
    
    console.log("Pokemon swapped");
    fetch(`https://tcg-back.herokuapp.com/cards/${id}`)
    .then(response => response.json())
    .then(card => {
        let cardContainer = document.createElement("img"); 
        if(health < card.hp){
            cardContainer.classList.add("red-outline");
        }
        let cardImage = card.imageUrl;
        let cardId = card.id;
        cardContainer.id = cardId;
        cardContainer.src = cardImage;
        cardContainer.setAttribute("health", health);
        parent.appendChild(cardContainer);
        
        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.classList.add("userPlays");
        li.innerText = `${card.name} has been taken out of play`;
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

        fetch(`https://tcg-back.herokuapp.com/decks/${id}`)
        .then(response => response.json())
        .then(deck => {
            if(!gymDeckId){
                playEnemyCard(deck)
            }else{
                fetchGymDeck()
            }
        })

    }else{
        oppAttackUser(card);
    }
}

function oppAttackUser(card){
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
    let health = parseInt(userCard.firstChild.getAttribute("health"));
    let newHealth = health - oppCardAttack;
    userCard.firstChild.setAttribute("health", newHealth);

    let current_health = Number(userCardHealth.innerText.split("/")[0])

    let playByPlay = document.querySelector('.playByPlay');
    let li = document.createElement('li');
    li.classList.add("oppPlays")
    li.innerText = `The Opponent's ${pokemonName} attacked the user with ${attackname} for ${oppCardAttack} damage!`;
    playByPlay.append(li);   

    // drawNewCard(card);

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

function drawNewCard(deck){

    let hand1 = document.querySelector(".div8");
    let hand2 = document.querySelector(".div9");
    let hand3 = document.querySelector(".div10");
    let hand4 = document.querySelector(".div11");
    let hand5 = document.querySelector(".div12");
    let hand6 = document.querySelector(".div13");
    
    if(hand1.childElementCount == 0){
        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.classList.add("userPlays");
        li.innerText = "The User draws 1 Card";
        playByPlay.append(li);
        let randNumber = Math.floor(Math.random() * 60);
       
            let cardContainer = document.createElement("img"); 
            cardContainer.setAttribute("health", deck.cards[randNumber].hp);
            let cardImage = deck.cards[randNumber].imageUrl;
            let cardId = deck.cards[randNumber].id;
            cardContainer.id = cardId;
            cardContainer.src = cardImage;
            hand1.appendChild(cardContainer);
            cardContainer.addEventListener("click", playCard);
        
    }else if(hand2.childElementCount == 0){
        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.classList.add("userPlays");
        li.innerText = "The User draws 1 Card";
        playByPlay.append(li);
        let randNumber = Math.floor(Math.random() * 60);

        let cardContainer = document.createElement("img"); 
            cardContainer.setAttribute("health", deck.cards[randNumber].hp);
            let cardImage = deck.cards[randNumber].imageUrl;
            let cardId = deck.cards[randNumber].id;
            cardContainer.id = cardId;
            cardContainer.src = cardImage;
            hand2.appendChild(cardContainer);
            cardContainer.addEventListener("click", playCard);
        
    }else if(hand3.childElementCount == 0){
        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.classList.add("userPlays");
        li.innerText = "The User draws 1 Card";
        playByPlay.append(li);
        let randNumber = Math.floor(Math.random() * 60);

        let cardContainer = document.createElement("img"); 
            cardContainer.setAttribute("health", deck.cards[randNumber].hp);
            let cardImage = deck.cards[randNumber].imageUrl;
            let cardId = deck.cards[randNumber].id;
            cardContainer.id = cardId;
            cardContainer.src = cardImage;
            hand3.appendChild(cardContainer);
            cardContainer.addEventListener("click", playCard);
        
    }else if(hand4.childElementCount == 0){
        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.classList.add("userPlays");
        li.innerText = "The User draws 1 Card";
        playByPlay.append(li);
        let randNumber = Math.floor(Math.random() * 60);

        let cardContainer = document.createElement("img"); 
            cardContainer.setAttribute("health", deck.cards[randNumber].hp);
            let cardImage = deck.cards[randNumber].imageUrl;
            let cardId = deck.cards[randNumber].id;
            cardContainer.id = cardId;
            cardContainer.src = cardImage;
            hand4.appendChild(cardContainer);
            cardContainer.addEventListener("click", playCard);
        
    }else if(hand5.childElementCount == 0){
        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.classList.add("userPlays");
        li.innerText = "The User draws 1 Card";
        playByPlay.append(li);
        let randNumber = Math.floor(Math.random() * 60);

        let cardContainer = document.createElement("img"); 
            cardContainer.setAttribute("health", deck.cards[randNumber].hp);
            let cardImage = deck.cards[randNumber].imageUrl;
            let cardId = deck.cards[randNumber].id;
            cardContainer.id = cardId;
            cardContainer.src = cardImage;
            hand5.appendChild(cardContainer);
            cardContainer.addEventListener("click", playCard);
        
    }else if(hand6.childElementCount == 0){
        let playByPlay = document.querySelector('.playByPlay');
        let li = document.createElement('li');
        li.classList.add("userPlays");
        li.innerText = "The User draws 1 Card";
        playByPlay.append(li);
        let randNumber = Math.floor(Math.random() * 60);

        let cardContainer = document.createElement("img"); 
            cardContainer.setAttribute("health", deck.cards[randNumber].hp);
            let cardImage = deck.cards[randNumber].imageUrl;
            let cardId = deck.cards[randNumber].id;
            cardContainer.id = cardId;
            cardContainer.src = cardImage;
            hand6.appendChild(cardContainer);
            cardContainer.addEventListener("click", playCard);
        
    }else{
        // alert("You can only have six pokemon in your hand")
        swal({
            title: "Card Limit",
            text: "You can only have six pokemon in your hand",
            icon: "info",
            button: "Got It!"
          });
    }
}

function win(){
    confirm("You Won!!!")
    // swal({
    //     title: "You Won!!!",
    //     text: "You Won! You are being redirected to the login page.",
    //     icon: "success",
    //     button: "Ok"
    //   });
    document.location.reload()
}

function lose(){
    confirm("You Lose :(")
    // swal({
    //     title: "You Lost",
    //     text: "You Lost :( . You are being redirected to the login page.",
    //     icon: "error",
    //     button: "Ok"
    //   });
    document.location.reload()
}

function myHPBar(healthBox,card,health) {
    const progressBarContainer = document.createElement('div')
    progressBarContainer.classList.add('progress')
    const hpBar = document.createElement('div');
    let healthBar = (health / card.hp)*100;
    hpBar.style.width = `${healthBar}%`;
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
    fetch('https://tcg-back.herokuapp.com/users')
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
        // console.log("succesful login")
        swal({
            title: "Login Successful",
            text: "Logging In",
            button: "Ok",
            icon: "success"
          });
        userShowPage(currentUser)
    } else {
        // alert("User Not Found!")
        swal({
            title: "Login Failed",
            text: "User Not Found!",
            icon: "error",
            button: "Ok"
          });
        
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
            gymDeckId = 7;
            break;
        case 'fire':
            currentGym = fire;
            currentBadge = fireBadge;
            gymDeckId = 2;
            break;
        case 'water':
            currentGym = water;
            currentBadge = waterBadge;
            gymDeckId = 3;
            break;
        case 'electric':
            currentGym = thunder;
            currentBadge = thunderBadge;
            gymDeckId = 5;
            break;
        case 'grass':
            currentGym = grass;
            currentBadge = grassBadge;
            gymDeckId = 4;
            break;
        case 'poison':
            currentGym = poison;
            currentBadge = poisonBadge;
            gymDeckId = 10;
            break;
        case 'psychic':
            currentGym = psychic;
            currentBadge = psychicBadge;
            gymDeckId = 6;
            break;
        case 'ground':
            currentGym = earth;
            currentBadge = earthBadge;
            gymDeckId = 1;
            break;
        default:
            currentGym = generic;
            currentBadge = genericBadge;
    }
}

function displayCard() {
    modalBody.innerText = ""
    const cardPic = document.createElement('img');
    cardPic.src = event.target.src;
    cardPic.id = 'modal-pic'
    modalBody.appendChild(cardPic)
}

function renderForm() {
    //body.innerText = ""
    cards.innerText = ""
    const createForm = document.createElement('form');
    const type1 = document.createElement('select');
    type1.id = "first-type"
    const type2 = document.createElement('select')
    type2.id = "second-type"
    const nameDeck = document.createElement('input')
    nameDeck.type = 'text'
    nameDeck.id = "deck-name"
    nameDeck.placeholder = "Name Your Deck"
    const createSubmit = document.createElement('input')
    createSubmit.type = "submit"
    createSubmit.value = "Create Deck"

    const fire = document.createElement('option')
    fire.setAttribute("value", "fire");
    fire.innerText = "Fire"
    type1.appendChild(fire)
    type2.appendChild(fire.cloneNode(true))

    const water = document.createElement('option')
    water.setAttribute("value", "water");
    water.innerText = "Water"
    type1.appendChild(water)
    type2.appendChild(water.cloneNode(true))

    const grass = document.createElement('option')
    grass.setAttribute("value", "grass");
    grass.innerText = "Grass"
    type1.appendChild(grass)
    type2.appendChild(grass.cloneNode(true))

    const lightning = document.createElement('option')
    lightning.setAttribute("value", "lightning");
    lightning.innerText = "Lightning"
    type1.appendChild(lightning)
    type2.appendChild(lightning.cloneNode(true))

    const psychic = document.createElement('option')
    psychic.setAttribute("value", "psychic");
    psychic.innerText = "Psychic"
    type1.appendChild(psychic)
    type2.appendChild(psychic.cloneNode(true))

    const colorless = document.createElement('option')
    colorless.setAttribute("value", "colorless");
    colorless.innerText = "Colorless"
    type1.appendChild(colorless)
    type2.appendChild(colorless.cloneNode(true))

    const darkness = document.createElement('option')
    darkness.setAttribute("value", "darkness");
    darkness.innerText = "Darkness"
    type1.appendChild(darkness)
    type2.appendChild(darkness.cloneNode(true))

    const dragon = document.createElement('option')
    dragon.setAttribute("value", "dragon");
    dragon.innerText = "Dragon"
    type1.appendChild(dragon)
    type2.appendChild(dragon.cloneNode(true))

    const fairy = document.createElement('option')
    fairy.setAttribute("value", "fairy");
    fairy.innerText = "Fairy"
    type1.appendChild(fairy)
    type2.appendChild(fairy.cloneNode(true))

    const fighting = document.createElement('option')
    fighting.setAttribute("value", "fighting");
    fighting.innerText = "Fighting"
    type1.appendChild(fighting)
    type2.appendChild(fighting.cloneNode(true))

    const metal = document.createElement('option')
    metal.setAttribute("value", "metal");
    metal.innerText = "Metal"
    type1.appendChild(metal)
    type2.appendChild(metal.cloneNode(true))

    createForm.appendChild(type1)
    createForm.appendChild(type2)
    createForm.appendChild(nameDeck)
    createForm.appendChild(createSubmit)
    cards.appendChild(createForm)
    createForm.addEventListener('submit', createDeck)
}

function createDeck() {
    event.preventDefault()
    const firstType = document.getElementById('first-type').value
    const secondType = document.getElementById('second-type').value
    const deck_name = document.getElementById('deck-name').value

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({user_id: currentUser.id, type1: firstType, type2: secondType, deck_name: deck_name})
    }
    

    fetch("https://tcg-back.herokuapp.com/decks", configObj)
    .then(response => response.json())
   .then(response => {
       decks.innerHTML = ""
       updateUser(currentUser, response)
        console.log(response)})
}

function myWonBadges() {
    myBadges.innerHTML = ""
    const waterBadgePic = document.createElement('img');
    waterBadgePic.src = waterBadge;
    myBadges.appendChild(waterBadgePic)
    waterBadgePic.classList.add('won-badge')

    const rockBadgePic = document.createElement('img');
    rockBadgePic.src = rockBadge;
    myBadges.appendChild(rockBadgePic)
    rockBadgePic.classList.add('won-badge')

    const fireBadgePic = document.createElement('img');
    fireBadgePic.src = fireBadge;
    myBadges.appendChild(fireBadgePic)
    fireBadgePic.classList.add('won-badge')

    const thunderBadgePic = document.createElement('img');
    thunderBadgePic.src = thunderBadge;
    myBadges.appendChild(thunderBadgePic)
    thunderBadgePic.classList.add('won-badge')

    const grassBadgePic = document.createElement('img');
    grassBadgePic.src = grassBadge;
    myBadges.appendChild(grassBadgePic)
    grassBadgePic.classList.add('won-badge')

    const psychicBadgePic = document.createElement('img');
    psychicBadgePic.src = psychicBadge;
    myBadges.appendChild(psychicBadgePic)
    psychicBadgePic.classList.add('won-badge')

    const poisonBadgePic = document.createElement('img');
    poisonBadgePic.src = poisonBadge;
    myBadges.appendChild(poisonBadgePic)
    poisonBadgePic.classList.add('won-badge')

    const earthBadgePic = document.createElement('img');
    earthBadgePic.src =earthBadge;
    myBadges.appendChild(earthBadgePic)
    earthBadgePic.classList.add('won-badge')

    const genericBadgePic = document.createElement('img');
    genericBadgePic.src =genericBadge;
    myBadges.appendChild(genericBadgePic)
    genericBadgePic.classList.add('won-badge')
}

function fetchGymDeck() {
    fetch(`https://tcg-back.herokuapp.com/decks/${gymDeckId}`)
    .then(response => response.json())
    .then(deck => {
        playEnemyCard(deck);
    })
}