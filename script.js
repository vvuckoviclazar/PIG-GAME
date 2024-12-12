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

let player1Score = 0;
let player2Score = 0;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let randomNumber = Math.ceil(Math.random() * 6);
let activePlayer = "player1";

rollNumber.textContent = randomNumber;

function gameCreator() {
  let number = 0;
}

function winner() {
  if (player1Score >= 20) {
    playerScore1.textContent = "Winner!";
    left.style.backgroundColor = "black";
    return;
  } else if (player2Score >= 20) {
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
    player1CurrentScore = player1CurrentScore + randomNumber;
    currentScore1.textContent = player1CurrentScore;
    player2CurrentScore = 0;
    currentScore2.textContent = player2CurrentScore;
  }

  if (activePlayer === "player2") {
    upDateUi(right, left, currentScore2, randomNumber);
    player2CurrentScore = player2CurrentScore + randomNumber;
    currentScore2.textContent = player2CurrentScore;
    player1CurrentScore = 0;
    currentScore1.textContent = player1CurrentScore;
  }
});

hold.addEventListener("click", (e) => {
  if (activePlayer === "player1") {
    player1Score = player1Score + player1CurrentScore;
    playerScore1.textContent = player1Score;
    player1CurrentScore = 0;
    currentScore1.textContent = player1CurrentScore;
    activePlayer = "player2";
    right.style.backgroundColor = "rgb(248, 211, 218)";
    left.style.backgroundColor = "rgb(214, 151, 162)";
  } else if (activePlayer === "player2") {
    player2Score = player2Score + player2CurrentScore;
    playerScore2.textContent = player2Score;
    player2CurrentScore = 0;
    currentScore2.textContent = player2CurrentScore;
    activePlayer = "player1";
    left.style.backgroundColor = "rgb(248, 211, 218)";
    right.style.backgroundColor = "rgb(214, 151, 162)";
  }
  winner();
});

newGame.addEventListener("click", (e) => {
  randomNumber = Math.ceil(Math.random() * 6);
  player1Score = 0;
  player2Score = 0;
  player1CurrentScore = 0;
  player2CurrentScore = 0;
  activePlayer = "player1";

  playerScore1.textContent = player1Score;
  currentScore1.textContent = player1CurrentScore;
  playerScore2.textContent = player2Score;
  currentScore2.textContent = player2CurrentScore;
  rollNumber.textContent = randomNumber;

  left.style.backgroundColor = "rgb(248, 211, 218)";
  right.style.backgroundColor = "rgb(214, 151, 162)";
});
