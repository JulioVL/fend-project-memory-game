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
let clonedStars = stars.cloneNode(true);
const boxStars = document.querySelector('.scorePanel');
let matchCounter = 0;
const completeMessage = document.querySelector('#completeMessage');
const timeClass = document.querySelector('.time');
let refreshIntervalId = 'x';

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

/**
* @description Increase an element by 1 and prints this number
*/
function elapsedTime(){
    timer += 1;
    timeSpan.textContent = timer;
}

/**
* @description Restarts every variable and element changed during previous game or after reloading page
* @returns variables and elements with their initial values
*/
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
    completeMessage.style.display = 'none';
    //resets elapsed time
    clearInterval(refreshIntervalId);
    refreshIntervalId = setInterval(function(){
                                        elapsedTime();
                                    },1000)
    //reset stars for complete box
    while (boxStars.firstChild) {
        boxStars.removeChild(boxStars.firstChild);
    }
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

/**
* @description Modifies the class name of the matched card elements to open show
* @param {string} cardOne The first card clicked
* @param {string} cardTwo The second card clicked
*/
function matchCards(cardOne, cardTwo){
    for(let i = 0; i < cardList.length; i++){
        if ( cardList[i].className === cardOne || cardList[i].className === cardTwo) {
            cardList[i].parentElement.className = 'card open show';
        }
    }
    clickedCardsArray = [];
}
/**
* @description Modifies the class name of the matched card elements to card
* @param {string} cardOne The first card clicked
* @param {string} cardTwo The second card clicked
*/
function unmatchCards(cardOne, cardTwo){
    for(let i = 0; i < cardList.length; i++){
        if ( cardList[i].className === cardOne || cardList[i].className === cardTwo) {
            cardList[i].parentElement.className = 'card';
        }
    }
    clickedCardsArray = [];
}
/**
* @description Prints the number of moves based on the counter
* @param {number} counter Counts the number of clicks made on the cards
*/
function setQuantity(counter){
    counter = Math.floor(counter/2);
    screenCounter.textContent = counter;
}

/**
* @description Removes stars from the stars element based on the counter
* @param {number} counter
*/
function removeStars(counter){
    if (counter === 20 || counter === 40 || counter === 60) {
        stars.firstElementChild.remove();
    }
}

/**
* @description Shows the completition message box and prints on it the stars and time employed in completing the game
*/
function showComplete(){
    completeMessage.style.display = 'inline';
    clonedStars = stars.cloneNode(true);
    boxStars.appendChild(clonedStars);
    timeClass.textContent = timer + ' seconds';
}

/**
* @description Listener activated when any of the cards are clicked (except the ones already matched)
*/
document.querySelector('.deck').addEventListener('click', function(evt) {
  //If prevents the clicks outside the cards to be considered
  if (evt.target.className.match(/card.*/) && evt.target.className !== 'card open show'
        && evt.target.className !== 'card match' && clickedCardsArray.length < 2) {
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
    //Execute function based on the matching or unmatching of cards
    if (clickedCardsArray.length>1 && clickedCardsArray[0]===clickedCardsArray[1]) {
      matchCards(clickedCardsArray[0], clickedCardsArray[1]);
      matchCounter += 1;
    } else if (clickedCardsArray.length > 1) {
      setTimeout(function(){
        unmatchCards(clickedCardsArray[0], clickedCardsArray[1]);
      }, 250);
    }
  }
  //Executes the function to show complete message when all cards have been matched
  if(matchCounter === 8){
    showComplete();
    //stops timer
    clearInterval(refreshIntervalId);
  }
})