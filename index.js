const board = document.getElementById("board");
const players = document.getElementsByClassName("player-info")[0];
const space = document.getElementsByTagName("td");
const horizontal = document.getElementsByTagName("tr");

const gameState = {
  players: ["x", "o"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

function makeGrid(size) {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("td");
      cell.innerText = null;
      row.append(cell);
    }
    board.appendChild(row);
  }
}
makeGrid(3);

let playerOne = true;

board.addEventListener("click", (event) => {
  const target = event.target;
  if (target.innerText == "") {
    if (playerOne == true) {
      target.innerHTML = "X";
      playerOne = false;
    } else {
      target.innerHTML = "O";
      playerOne = true;
    }
  } else {
    alert("Not Available");
  }
});

// const winningPossibility = []

// for (i=0; i < horizontal.length; i++){
    
// }

console.log(board)