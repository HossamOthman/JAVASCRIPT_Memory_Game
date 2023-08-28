const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  // do they match ?
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

  isMatch ? disableCards() : unflipCards()
 
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard()
}

function unflipCards() {
    lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    
    resetBoard();
  }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}
