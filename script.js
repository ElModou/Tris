const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let cells = [];
let gameOver = false;

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(cell, i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function makeMove(cell, index) {
  if (gameOver || cell.textContent !== "") return;
  cell.textContent = currentPlayer;
  if (checkWin()) {
    statusText.textContent = `Ha vinto ${currentPlayer}!`;
    gameOver = true;
  } else if (cells.every(c => c.textContent !== "")) {
    statusText.textContent = "Pareggio!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Tocca a ${currentPlayer}`;
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => cells[i].textContent === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Tocca a X";
  createBoard();
}

createBoard();
