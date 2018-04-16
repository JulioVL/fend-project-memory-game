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

function printShuffle(){
	shuffle(arregloPrueba);
	for(var i = 0; i < cardList.length; i++){
		//console.log(arrCardList[i].className);
	    cardList[i].className = arregloPrueba[i];
	}
}
	
//Execute print shuffle every time the web page is reloaded
printShuffle();

//Execute print shuffle every time reload button is clicked
const restart = document.querySelector('.restart');

restart.addEventListener('click', printShuffle);


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

let clickedCardsArray = [];

function matchCards(cardOne, cardTwo){
    for(var i = 0; i < cardList.length; i++){
        console.log(cardOne + ' ' + cardTwo);
        if ( cardList[i].className === cardOne || cardList[i].className === cardTwo) {
            cardList[i].parentElement.className = 'card open show';
        }
    }
    clickedCardsArray = [];
}

function unmatchCards(cardOne, cardTwo){
    for(var i = 0; i < cardList.length; i++){
        console.log(cardOne + ' ' + cardTwo);
        if ( cardList[i].className === cardOne || cardList[i].className === cardTwo) {
            cardList[i].parentElement.className = 'card';
        }
    }
    clickedCardsArray = [];
}

document.querySelector('.deck').addEventListener('click', function(evt) {
  if (evt.target.className.match(/card.*/)) {
    evt.target.className = 'card match';
  
    clickedCardsArray.push(evt.target.querySelector('i').className);
    console.log(clickedCardsArray);

    if (clickedCardsArray.length>1 && clickedCardsArray[0]===clickedCardsArray[1]) {
      console.log('Me ejecutaron!' + clickedCardsArray[0] + clickedCardsArray[1]);
      matchCards(clickedCardsArray[0], clickedCardsArray[1]);
    } else if (clickedCardsArray.length > 1) {
      console.log('didnt match');
      unmatchCards(clickedCardsArray[0], clickedCardsArray[1]);
    }
  }
})

