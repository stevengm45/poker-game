const cards = [];
const nameSuit = ['d', 'p', 't', 'c'];
const initialFee = 100;
let playerCash = 2000;
let betAmount = 0;

class Card {
  constructor(s, n, p) {
    this.suit = s;
    this.number = n;
    this.player = p;
  }
}
function valorInicial (max) {
  max = 2000;
  return max;
}


function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function uniqueCard (suit, number) {
  for (let i = 0; i < cards.length; i++)
  {
    if (cards[i].suit === suit && cards[i].number === number) {
      return false;
    }
  }
  return true;
}

function giveCard (player) {
  let suit = getRandomNumber(1, 4);
  let number = getRandomNumber(1, 13);

  while (!uniqueCard(suit, number))
  {
    suit = getRandomNumber(1, 4);
    number = getRandomNumber(1, 13);
  }

  const newCard = new Card(suit, number, player);
  cards.push(newCard);

  return newCard;
}

function selectGame (player) {
  let playerCards = [];

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].player === player || cards[i].player === 'table') {
      playerCards.push(cards[i]);
    }
  }
  if (royalFlush(playerCards)) {
    return 10;
  } else if (color(playerCards)) {
    return 9;
  } else if (poker(playerCards)) {
    return 8;
  } else if (poker(playerCards)) {
    return 7;
  } else if (poker(playerCards)) {
    return 6;
  } else if (poker(playerCards)) {
    return 5;
  } else if (poker(playerCards)) {
    return 4;
  } else if (poker(playerCards)) {
    return 3;
  } else if (poker(playerCards)) {
    return 2;
  } else if (poker(playerCards)) {
    return 1;
  }
}

function royalFlush (selectedCards) {
  const suitCards = selectedCards[0].suit;
  let cardsMatch = 0;
  const match = [1, 10, 11, 12, 13];

  for (let i = 0; i < selectedCards.length; i++) {
    if (selectedCards[i].suit === suitCards && match.includes(selectedCards[i].number === 1)) {
      cardsMatch++;
    }
  }
  if (cardsMatch === 5) {
    return true;
  } else {
    return false;
  }
}

function color (selectedCards) {
  const suitCards = selectedCards[0].suit;

  for (let i = 0; i < selectedCards.length; i++) {
    if (selectedCards[i].suit !== suitCards) {
      return false;
    }
  }
  return true;
}

function poker (selectedCards) {
  let counter_aces = 0;

  for (let i = 0; i < selectedCards.length; i++) {
    if (selectedCards[i].suit === 1) {
      return(counter_aces++);
    }
    if (counter_aces === 4) {
      return true;
    } else {
      return false;
    }
  }
};

// Functionality
// Give cards to the player and enter
function initialPlay() {
  addCard(giveCard('player 1'), "#playerCards");
  addCard(giveCard('player 1'), "#playerCards");

  // Enter the game 
  alert('Are you entering paying the initial fee?');

  if (playerCash < initialFee) {
    alert('Not enough money');
  } else {
    playerCash = playerCash - initialFee;
    tableCardsRound1();
    betRegister();
    tableCardsRound23();
    betRegister();
    tableCardsRound23();
    betRegister();
    computerCards();
    checkWinner();
  }
}

// Open 3 cards to the table
function tableCardsRound1() {
  addCard(giveCard('table'), "#board");
  addCard(giveCard('table'), "#board");
  addCard(giveCard('table'), "#board");
}

// Bet or continue
function betRegister() {
  let amount = false;

  setTimeout(() => {
    amount = prompt('How much do you want to bet?');
    if ((playerCash - amount - betAmount) >= 0) {
      betAmount = betAmount + parseInt(amount);
    } else {
      alert ('You dont have enough money to bet, you only have: ', playerCash - betAmount);
      betRegister();
    }
  }, 100);
  
}
//const cardsTable = cards.filter((card) => card.player === 'table');
  
function addCard(card, parent) {
  const wrapperDiv = document.createElement("DIV");
  const imageCard = document.createElement("IMG");
  imageCard.setAttribute("src", `./img/${card.number}${nameSuit[card.suit]}.png`);
  console.log(cards);
  wrapperDiv.appendChild(imageCard);
  document.querySelector(parent).appendChild(wrapperDiv);
}


// Open fourth card
function tableCardsRound23() {  
  addCard(giveCard('table'), "#board");
}

// Give cards to computer
function computerCards() {
  giveCard('computer');
  giveCard('computer');
}

// Check who wins
function checkWinner() {
  const levelPlayer1 = selectGame('player 1');
  const levelComputer = selectGame('computer');
  if (levelPlayer1 > levelComputer) { 
    playerCash = playerCash + betAmount;
  } else if (levelPlayer1 < levelComputer) {
    playerCash = playerCash - betAmount;
  }
}