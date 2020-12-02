'use strict';

// VARIABLES

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// console.log(secretNumber); // showing the secretNumber here for testing

// FUNCTIONS
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function wrongGuess(message) {
  displayMessage(message);
  score--;
  document.querySelector('.score').textContent = score;
}

function loseGame() {
  displayMessage('YOU LOSE.');
  score = 0;
  document.querySelector('.score').textContent = score;
}

function setCSS(background, width) {
  document.querySelector('body').style.backgroundColor = background;
  document.querySelector('.number').style.width = width;
}

// EVENTS

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // when there is no input
  if (!guess) {
    displayMessage('No number!');

    // when the player wins
  } else if (guess === secretNumber) {
    displayMessage('Correct number!');
    document.querySelector('.number').textContent = secretNumber + '!'; // display the secret number

    setCSS('#60b347', '30rem');

    //  .. if the score is lower than the high score
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // when the quess is too high
  } else if (guess > secretNumber) {
    score > 1 ? wrongGuess('Too High!') : loseGame();

    // when the guess is too low
  } else if (guess < secretNumber) {
    score > 1 ? wrongGuess('Too Low!') : loseGame();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  console.log(secretNumber); // showing the secretNumber here for testing

  // text element reset
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;

  setCSS('#222', '15rem');
});
