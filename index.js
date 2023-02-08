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

// Board Set-up
function makeGrid(size) {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("td");
      cell.innerText = null;
      cell.setAttribute("id", `row ${i} cell ${j}`);
      row.append(cell);
    }
    row.setAttribute("id", `row ${i}`);
    board.appendChild(row);
  }
}
makeGrid(3);

// Player Set-up & Playing
let playerOne = true;
let play1 = []
let play2 = []

board.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "TD") {
    if ((event, target.innerText == "")) {
      if (playerOne == true) {
        target.innerHTML = "X";
        play1.push(target)
        playerOne = false;
      } else {
        target.innerHTML = "O";
        play2.push(target)
        playerOne = true;
      }
    } else {
      alert("This is already occupied.");
    }
  } else {
    alert("Not Available");
  }
});

console.log(play1)
console.log(play2)

// Winning Possibilities
let allCell = [];
let rowNum = [];
for (const child of board.children) {
  rowNum.push(child);
}
for (i = 0; i < rowNum.length; i++) {
  let current = rowNum[i];
  let Num = [];
  for (const childOf of current.children) {
    Num.push(childOf);
  }
  allCell.push(Num);
}

let winningPossibility = [];

// Horizontal
for (let i = 0; i < allCell.length; i++) {
  winningPossibility.push(allCell[i]);
}
// Vertical
for (let i = 0; i < allCell.length; i++) {
  let hold = [];
  for (let j = 0; j < allCell.length; j++) {
    hold.push(allCell[j][i]);
  }
  winningPossibility.push(hold);
}
//Diagonal
let temp = [];
for (let i = 0; i < allCell.length; i++) {
  temp.push(allCell[i][i]);
}
winningPossibility.push(temp);

let temp2 = [];
for (let i = 0; i < allCell.length; i++) {
    for (let j = 0; j < allCell.length; j++) {
        if(i + j == allCell.length - 1){
            temp2.push(allCell[i][j])
        }
        else {
            continue
        }
    }
}
winningPossibility.push(temp2);