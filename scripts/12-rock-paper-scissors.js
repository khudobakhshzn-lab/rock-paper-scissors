let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreButton();

let isAutoPlaying = false;
let intervalID;

// === AUTO PLAY ===
function autoPlay() {
  const button = document.querySelector('.js-autoplay-button');
  
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    button.innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    button.innerHTML = 'Auto Play';
  }
}

// === RESET SCORE (with confirmation) ===
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreButton();
  hideResetConfirmation();
}

function showResetConfirmation() {
  const messageElement = document.querySelector('.js-request-message');
  
  messageElement.innerHTML = `
    Are you sure you want to reset the score?
    <button class="js-yes-button">Yes</button>
    <button class="js-no-button">No</button>
  `;

  // Yes button
  document.querySelector('.js-yes-button')
    .addEventListener('click', resetScore);

  // No button
  document.querySelector('.js-no-button')
    .addEventListener('click', hideResetConfirmation);
}

function hideResetConfirmation() {
  document.querySelector('.js-request-message').innerHTML = '';
}

// === EVENT LISTENERS ===

// Move buttons
document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

// Auto Play button
document.querySelector('.js-autoplay-button')
  .addEventListener('click', autoPlay);

// Reset button (shows confirmation)
document.querySelector('.js-reset-score-button')
  .addEventListener('click', showResetConfirmation);

// Keyboard shortcuts
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    // Show confirmation instead of instantly resetting
    showResetConfirmation();
  }
});

// === GAME FUNCTIONS ===

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }
  
  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `
    You 
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer
  `;

  updateScoreButton();
}

function updateScoreButton() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomMove = Math.random();
  let computerMove = '';

  if (randomMove >= 0 && randomMove < 1/3) {
    computerMove = 'rock';
  } else if (randomMove >= 1/3 && randomMove < 1/2) {
    computerMove = 'paper';
  } else if (randomMove >= 1/2 && randomMove < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}