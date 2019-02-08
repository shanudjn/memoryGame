//select all the cards having the class .memory-card
const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
//flipCard function will look into the css to toggle to the flip class.
function flipCard() {
  if (lockBoard) return ;
  if (this === firstCard) return;

  this.classList.add('flip');
  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;

  checkForMatch();
}
//to check if two cards match
function checkForMatch(){
  //Whenever we feel like adding extra information to HTML elements, we can make use of data attributes.
  //Check html file haning data attribute "data-framework"

  //if the data-framework of both the cards are same
  if(firstCard.dataset.framework === secondCard.dataset.framework){
    //console.log(`I am in checkformatch and the cards match`);
    disableCards();
    return;
  }
  //if the cards do not match
  unflipCards();
}
//if two cards match disable the event listeners of those two cards
function disableCards(){
  //console.log(`I am in disableCards`);
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

//if the cards do not match unflip.
function unflipCards(){
  //console.log(`I am in unflipCards`);
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();

  }, 1500);
}
//reset the board
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
//an IIFE to shuffle the cards since we are using flex
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

//adding a click event listener to each card.
cards.forEach(card => card.addEventListener("click", flipCard));
