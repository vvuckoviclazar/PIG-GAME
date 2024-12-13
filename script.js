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

let randomNumber = Math.ceil(Math.random() * 6);
let activePlayer = "player1";
rollNumber.textContent = randomNumber;

function gameCreator() {
  let score = 0;
  let currentScore = 0;

  const currentScoreCounter = () => {
    currentScore += randomNumber;
  };

  const getCurrentScore = () => {
    return currentScore;
  };

  const scoreCounter = () => {
    score += currentScore;
  };

  const getScore = () => {
    return score;
  };

  const resetCurrentScore = () => {
    return (currentScore = 0);
  };

  const resetScore = () => {
    return (score = 0);
  };

  return {
    scoreCounter,
    currentScoreCounter,
    getCurrentScore,
    getScore,
    resetCurrentScore,
    resetScore,
  };
}

const player1 = gameCreator();
const player2 = gameCreator();

function winner() {
  if (player1.getScore() >= 20) {
    playerScore1.textContent = "Winner!";
    left.style.backgroundColor = "black";
    return;
  } else if (player2.getScore() >= 20) {
    playerScore2.textContent = "Winner!";
    right.style.backgroundColor = "black";
    return;
  }
}

rollDice.addEventListener("click", (e) => {
  randomNumber = Math.ceil(Math.random() * 6);
  rollNumber.textContent = randomNumber;
  if (randomNumber === 1) {
    activePlayer = activePlayer === "player1" ? "player2" : "player1";
  }

  function upDateUi(side1, side2, element, number) {
    element.textContent = number;

    side1.style.backgroundColor = "rgb(248, 211, 218)";
    side2.style.backgroundColor = "rgb(214, 151, 162)";
  }

  if (activePlayer === "player1") {
    upDateUi(left, right, currentScore1, randomNumber);
    player1.currentScoreCounter();
    currentScore1.textContent = player1.getCurrentScore();
    player2.resetCurrentScore();
    currentScore2.textContent = player2.resetCurrentScore();
  }

  if (activePlayer === "player2") {
    upDateUi(right, left, currentScore2, randomNumber);
    player2.currentScoreCounter();
    currentScore2.textContent = player2.getCurrentScore();
    player1.resetCurrentScore();
    currentScore1.textContent = player1.resetCurrentScore();
  }
});

hold.addEventListener("click", (e) => {
  if (activePlayer === "player1") {
    player1.scoreCounter();
    playerScore1.textContent = player1.getScore();
    currentScore1.textContent = player1.resetCurrentScore();
    activePlayer = "player2";
    right.style.backgroundColor = "rgb(248, 211, 218)";
    left.style.backgroundColor = "rgb(214, 151, 162)";
  } else if (activePlayer === "player2") {
    player2.scoreCounter();
    playerScore2.textContent = player2.getScore();
    currentScore2.textContent = player2.resetCurrentScore();
    activePlayer = "player1";
    left.style.backgroundColor = "rgb(248, 211, 218)";
    right.style.backgroundColor = "rgb(214, 151, 162)";
  }
  winner();
});

newGame.addEventListener("click", (e) => {
  randomNumber = Math.ceil(Math.random() * 6);
  player1.resetScore();
  player2.resetScore();
  player1.resetCurrentScore();
  player2.resetCurrentScore();
  activePlayer = "player1";

  playerScore1.textContent = player1.resetScore();
  currentScore1.textContent = player1.resetCurrentScore();
  playerScore2.textContent = player2.resetScore();
  currentScore2.textContent = player2.resetCurrentScore();
  rollNumber.textContent = randomNumber;

  left.style.backgroundColor = "rgb(248, 211, 218)";
  right.style.backgroundColor = "rgb(214, 151, 162)";
});
