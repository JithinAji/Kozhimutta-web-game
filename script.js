const container = document.querySelector(".container");
const basket = document.querySelector(".basket");
const hens = document.querySelectorAll(".hen");
const out = ["e", "e", "e", "s", "s", "g", "p", "p"];
const points = document.querySelector(".points");
const menu = document.querySelector(".menu");
const play = document.querySelector("h2");
const scoreCard = document.querySelector("h3");

let clearBoard = null;

let score = 0;
let shouldEnd = false;
let gameIntervel = null;
let time = 60;

// move basket
container.addEventListener("mousemove", (e) => {
  let cordinates = container.getBoundingClientRect();
  basket.style.left = `${e.clientX - cordinates.left - 40}px`;
});

function layEgg(hen) {
  if (!hen || shouldEnd) {
    return;
  }
  let eggCordinates = hen.getBoundingClientRect();
  let containerCordinates = container.getBoundingClientRect();

  let item = out[Math.floor(Math.random() * out.length)];

  let egg = document.createElement("img");
  egg.style.height = "30px";
  egg.style.width = "30px";
  egg.style.position = "absolute";
  switch (item) {
    case "g":
      egg.src = "./gold.png";
      egg.classList.add("gold");
      break;
    case "e":
      egg.src = "./egg.png";
      egg.classList.add("regular");
      break;
    case "s":
      egg.src = "./silver.png";
      egg.classList.add("silver");
      break;
    case "p":
      egg.src = "./poop.png";
      egg.classList.add("poop");
      break;
  }
  egg.style.left = `${eggCordinates.left - containerCordinates.left + 10}px`;
  egg.style.top = `60px`;
  container.appendChild(egg);
  fallEgg(egg);
}

function initGame() {
  setTimeout(() => {
    let randomNum;
    let limit = Math.floor(Math.random() * 3);
    let temp = 0;
    for (let i = 0; i < limit; i++) {
      randomNum = Math.floor(Math.random() * 5);
      if (temp == randomNum) {
        randomNum = randomNum + (1 % 5);
      }
      temp = randomNum;
      layEgg(hens[randomNum]);
    }
    if (!shouldEnd) {
      initGame();
    }
  }, 1500);
}

function fallEgg(egg) {
  let top = parseInt(egg.style.top);
  let basketContainer = basket.getBoundingClientRect();
  let eggContainer = egg.getBoundingClientRect();
  if (top > 450 || shouldEnd) {
    egg.remove();
    return;
  }

  if (
    eggContainer.top >= basketContainer.top &&
    eggContainer.left >= basketContainer.left &&
    eggContainer.right <= basketContainer.right
  ) {
    if (egg.classList.contains("regular")) {
      score += 10;
      points.innerHTML = "+10";
      if (clearBoard) {
        clearTimeout(clearBoard);
      }
      clearBoard = setTimeout(() => {
        points.innerHTML = "";
      }, 1000);
    }
    if (egg.classList.contains("silver")) {
      score += 20;
      points.innerHTML = "+20";
      if (clearBoard) {
        clearTimeout(clearBoard);
      }
      clearBoard = setTimeout(() => {
        points.innerHTML = "";
      }, 1000);
    }
    if (egg.classList.contains("gold")) {
      score += 30;
      points.innerHTML = "+30";
      if (clearBoard) {
        clearTimeout(clearBoard);
      }
      clearBoard = setTimeout(() => {
        points.innerHTML = "";
      }, 1000);
    }
    if (egg.classList.contains("poop")) {
      score -= 10;
      points.innerHTML = "-10";
      if (clearBoard) {
        clearTimeout(clearBoard);
      }
      clearBoard = setTimeout(() => {
        points.innerHTML = "";
      }, 1000);
    }
    egg.remove();
    return;
  }
  egg.style.top = `${top + 2}px`;
  setTimeout(() => {
    fallEgg(egg);
  }, 10);
  let scoreField = document.querySelector(".score");
  scoreField.innerHTML = "Score: " + score;
}

function startTimer() {
  setTimeout(() => {
    let timerField = document.querySelector(".timer");
    timerField.innerHTML = "Time: " + time + " sec";
    time -= 1;
    if (time > 0) {
      startTimer();
    } else {
      shouldEnd = true;
      scoreCard.innerHTML = "Score :" + score;
      play.textContent = "Replay";
      menu.style.display = "flex";
    }
  }, 1000);
}

function startGame() {
  if (gameIntervel) clearInterval(gameIntervel);
  menu.style.display = "none";
  clearBoard = null;
  score = 0;
  shouldEnd = false;
  initGame();
  startTimer();
}

play.addEventListener("click", () => {
  startGame();
});
