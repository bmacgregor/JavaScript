'use strict';

// VARIABLES
let currentScore = 0;
let totalScores = [0, 0];
let activePlayer = 0;
let gameOver = false;

// Selecting DOM elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const dieEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// FUNCTIONS
const resetGame = function () {
  currentScore = 0;
  totalScores = [0, 0];
  activePlayer = 0;
  gameOver = false;

  score0El.textContent = totalScores[0];
  score1El.textContent = totalScores[1];
  dieEl.classList.add('hidden');
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  if (player0El.classList.contains('player--winner')) {
    player0El.classList.remove('player--winner');
  } else if (player1El.classList.contains('player--winner')) {
    player1El.classList.remove('player--winner');
  }

  if (!player0El.classList.contains('player--active')) {
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
};

const rollDie = function () {
  if (!gameOver) {
    const roll = Math.trunc(Math.random() * 6) + 1;
    dieEl.classList.remove('hidden');
    dieEl.src = `dice-${roll}.png`;

    roll !== 1 ? addToScore(roll) : switchPlayer();
  }
};

const addToScore = function (roll) {
  currentScore += roll;
  activePlayer === 0
    ? (current0El.textContent = currentScore)
    : (current1El.textContent = currentScore);
};

const switchPlayer = function () {
  currentScore = 0;
  activePlayer === 0
    ? (current0El.textContent = currentScore)
    : (current1El.textContent = currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const holdScore = function () {
  if (!gameOver) {
    totalScores[activePlayer] += currentScore;
    activePlayer === 0
      ? (score0El.textContent = totalScores[0])
      : (score1El.textContent = totalScores[1]);
    currentScore = 0;
    activePlayer === 0
      ? (current0El.textContent = currentScore)
      : (current1El.textContent = currentScore);

    totalScores[activePlayer] >= 30 ? winGame() : switchPlayer();
  }
};

const winGame = function () {
  if (activePlayer === 0) {
    player0El.classList.add('player--winner');
    player0El.classList.remove('player--active');
  } else {
    player1El.classList.add('player--winner');
    player1El.classList.remove('player--active');
  }

  gameOver = true;
  dieEl.classList.toggle('hidden');
};

// EVENTS
btnRoll.addEventListener('click', rollDie);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', resetGame);

// CODE
resetGame();
