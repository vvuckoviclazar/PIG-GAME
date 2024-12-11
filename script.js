"use strict";

const playerScore1 = document.querySelector(".playerScore1");
const currentScore1 = document.querySelector(".currentScore1");
const playerScore2 = document.querySelector(".playerScore2");
const currentScore2 = document.querySelector(".currentScore2");
const newGame = document.querySelector(".newGame");
const rollDice = document.querySelector(".rollDice");
const hold = document.querySelector(".hold");
const rollNumber = document.querySelector(".rollNumber");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

function pigGameCreator() {
  let player1Score = 0;
  let player2Score = 0;
  let player1CurrentScore = 0;
  let player2CurrentScore = 0;
  let randomNumber = Math.ceil(Math.random() * 6);
  let activePlayer = "player1";

  const updateScores = () => {
    playerScore1.textContent = player1Score;
    currentScore1.textContent = player1CurrentScore;
    playerScore2.textContent = player2Score;
    currentScore2.textContent = player2CurrentScore;
    rollNumber.textContent = randomNumber;
  };

  const switchPlayer = () => {
    activePlayer = activePlayer === "player1" ? "player2" : "player1";
  };

  const updateUI = (activeSide, inactiveSide, scoreElement, newScore) => {
    scoreElement.textContent = newScore;
    activeSide.style.backgroundColor = "rgb(248, 211, 218)";
    inactiveSide.style.backgroundColor = "rgb(214, 151, 162)";
  };

  const rollHandler = () => {
    randomNumber = Math.ceil(Math.random() * 6);
    rollNumber.textContent = randomNumber;

    if (randomNumber === 1) {
      switchPlayer();
    } else {
      if (activePlayer === "player1") {
        player1CurrentScore += randomNumber;
        player2CurrentScore = 0;
        updateUI(left, right, currentScore1, player1CurrentScore);
      } else {
        player2CurrentScore += randomNumber;
        player1CurrentScore = 0;
        updateUI(right, left, currentScore2, player2CurrentScore);
      }
    }
    updateScores();
  };

  const holdHandler = () => {
    if (activePlayer === "player1") {
      player1Score += player1CurrentScore;
      player1CurrentScore = 0;
      updateUI(right, left, playerScore1, player1Score);
      switchPlayer();
    } else {
      player2Score += player2CurrentScore;
      player2CurrentScore = 0;
      updateUI(left, right, playerScore2, player2Score);
      switchPlayer();
    }
    checkWinner();
    updateScores();
  };

  const checkWinner = () => {
    if (player1Score >= 20) {
      playerScore1.textContent = "Winner!";
      left.style.backgroundColor = "black";
      right.style.backgroundColor = "rgb(214, 151, 162)";
    } else if (player2Score >= 20) {
      playerScore2.textContent = "Winner!";
      right.style.backgroundColor = "black";
      left.style.backgroundColor = "rgb(214, 151, 162)";
    }
  };

  const resetGame = () => {
    player1Score = 0;
    player2Score = 0;
    player1CurrentScore = 0;
    player2CurrentScore = 0;
    randomNumber = Math.ceil(Math.random() * 6);
    activePlayer = "player1";

    left.style.backgroundColor = "rgb(248, 211, 218)";
    right.style.backgroundColor = "rgb(214, 151, 162)";
    playerScore1.textContent = 0;
    playerScore2.textContent = 0;
    rollNumber.textContent = "-";
    updateScores();
  };

  return {
    rollDice: rollHandler,
    holdScore: holdHandler,
    resetGame,
  };
}

const pigGame = pigGameCreator();

rollDice.addEventListener("click", pigGame.rollDice);
hold.addEventListener("click", pigGame.holdScore);
newGame.addEventListener("click", pigGame.resetGame);
