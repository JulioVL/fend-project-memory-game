/*
 * Create a list that holds all of your cards
 */
 const cardList = document.querySelector('.deck').getElementsByTagName('i');
 const arregloPrueba = ['fa fa-anchor',
    'fa fa-anchor',
    'fa fa-bicycle',
    'fa fa-bicycle',
    'fa fa-bolt',
    'fa fa-bolt',
    'fa fa-bomb',
    'fa fa-bomb',
    'fa fa-cube',
    'fa fa-cube',
    'fa fa-diamond',
    'fa fa-diamond',
    'fa fa-leaf',
    'fa fa-leaf',
    'fa fa-paper-plane-o',
    'fa fa-paper-plane-o'];
const restart = document.querySelector('.restart');
let clickedCardsArray = [];
let cardCounter = 0;
let screenCounter = document.querySelector('.moves');
let timeSpan = document.querySelector('.timer');
let timer = 0;
const starElement = '<li>*</li>';
const stars = document.querySelector('.stars');
let matchCounter = 0;
const completeMessage = document.querySelector('#completeMessage');
const timeClass = document.querySelector('.time');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function restartGame(){
	shuffle(arregloPrueba);
	for(let i = 0; i < cardList.length; i++){
	    cardList[i].className = arregloPrueba[i];
        cardList[i].parentElement.className = 'card';
	}
    clickedCardsArray = [];
    screenCounter.textContent = 0;
    cardCounter = 0;
    timeSpan.textContent = 0;
    timer = 0;
    //add stars
    stars.innerHTML = '';
    
    for (let i = 0; i < 3; i++) {
        const newLI = document.createElement('li');
        const newI = document.createElement('i');
        stars.appendChild(newLI);
        stars.lastChild.appendChild(newI);
        stars.lastChild.lastChild.classList.add('fa', 'fa-star');
    }

    matchCounter = 0;
    completeMessage.style.display = "none";
}
	
//Execute print shuffle every time the web page is reloaded
restartGame();

//Execute restartGame every time reload button is clicked
restart.addEventListener('click', restartGame);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//change the classname for matches
function matchCards(cardOne, cardTwo){
    for(var i = 0; i < cardList.length; i++){
        if ( cardList[i].className === cardOne || cardList[i].className === cardTwo) {
            cardList[i].parentElement.className = 'card open show';
        }
    }
    clickedCardsArray = [];
}
//change the classname for unmatches
function unmatchCards(cardOne, cardTwo){
    for(var i = 0; i < cardList.length; i++){
        if ( cardList[i].className === cardOne || cardList[i].className === cardTwo) {
            cardList[i].parentElement.className = 'card';
        }
    }
    clickedCardsArray = [];
}
//Print the quantity of moves made by user
function setQuantity(counter){
    counter = Math.floor(counter/2);
    screenCounter.textContent = counter;
}

//Remove stars
function removeStars(counter){
    if (counter === 20 || counter === 40 || counter === 60) {
        stars.firstElementChild.remove();
    }
}

//Set timer
setInterval(function(){ 
    timer += 1; 
    timeSpan.textContent = timer;
}, 1000);

//Style completion message box
function showComplete(){
    completeMessage.style.display = "inline";
    timeClass.textContent = timer + ' seconds';
}


//listens at the deck element for clicks
document.querySelector('.deck').addEventListener('click', function(evt) {
  //If prevents the clicks outside the cards to be considered
  if (evt.target.className.match(/card.*/) && evt.target.className !== 'card open show') {
    //set the class name to card match to flip it
    evt.target.className = 'card match';

    //Based on the quantity of user's moves, it prints the moves quantity on screen
    cardCounter += 1;
    setQuantity(cardCounter);

    //Based on the quantity of user's moves, it adds or removes stars
    //Remove stars for every 10 moves (20 counts)
    removeStars(cardCounter);

    //Check if cards matched or not
    //adds card name to array
    clickedCardsArray.push(evt.target.querySelector('i').className);
    //Execute function based on the matching of cards
    if (clickedCardsArray.length>1 && clickedCardsArray[0]===clickedCardsArray[1]) {
      matchCards(clickedCardsArray[0], clickedCardsArray[1]);
      matchCounter += 1;
    } else if (clickedCardsArray.length > 1) {
      //unmatchCards(clickedCardsArray[0], clickedCardsArray[1]);
      setTimeout(function(){
        unmatchCards(clickedCardsArray[0], clickedCardsArray[1]);
      }, 300);
    }
  }
  if(matchCounter === 8){
    showComplete();
  }
})



