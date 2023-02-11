const board = document.getElementById("board");
const player1 = document.getElementById("player1_name");
const player2 = document.getElementById("player2_name");
const space = document.getElementsByTagName("td");
const horizontal = document.getElementsByTagName("tr");
const numInput = document.querySelector("#board-size");

const gameState = {
  players: ["x", "o"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

// Determine who goes first
const names = [];
let name1 = prompt("What is your name?", "");
names.push(name1);
let name2 = prompt(
  `What is the other person's name? Write "blank" if you want to play with Computer`,
  ""
);
switch (name2) {
  case "blank":
    alert(name1 + " will go first!");
    player1.innerText = name1
    player2.innerText = "Computer";
    break;

  default:
    names.push(name2);
    randomName = names[Math.floor(Math.random() * names.length)];
    alert(randomName + " will go first!");
    names.splice(names.indexOf(randomName), 1);
    player1.innerText = randomName;
    player2.innerText = names[0];
    break
}

// Board Set-up
let boardSize = prompt("How big should the board be? [choices: 3, 4, 5]", '3')
switch(boardSize) {
    case null:
        makeGrid(3)
    default:
        makeGrid(Number(boardSize))
}

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

// Player Set-up & Playing
let playerOne = true;
let play1_id = [];
let play2_id = [];

board.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "TD") {
    if ((target.innerText == "")) {
      if (playerOne == true) {
        target.innerHTML = "X";
        play1_id.push(target.id);
        console.log(play1_id)
        console.log(checkWin(play1_id))
        if (checkWin(play1_id).includes(Number(boardSize))) {
            alert ("Player 1 won!")
        }   
        playerOne = false;
      } else {
        target.innerHTML = "O";
        play2_id.push(target.id);
        if (checkWin(play2_id).includes(Number(boardSize))) {
            alert ("Player 2 won!")
        }   
        playerOne = true;
      }
    } else {
      alert("This is already occupied.");
    }
  } else {
    alert("Not Available");
  }
});

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

const winningPossibility = [];
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
    if (i + j == allCell.length - 1) {
      temp2.push(allCell[i][j]);
    } else {
      continue;
    }
  }
}
winningPossibility.push(temp2);

let holding = [];
for (let i = 0; i < winningPossibility.length; i++) {
  current = winningPossibility[i];
  for (let j = 0; j < current.length; j++) {
    holding.push(current[j].id);
  }
}
let size = rowNum.length;
const winningPossibility_id = [];
while (holding.length > 0) {
  winningPossibility_id.push(holding.splice(0, size));
}

// Check for winning
function checkWin (arr) {
    const collection = []
    for (i=0; i < arr.length; i++) {
        cur = arr[i]
        const found = winningPossibility_id.filter((e) => e.includes(arr[i]))
        collection.push(found)
    }
    const progress =  collection.flat(1)
    const elementCount = progress.reduce((count, e) => (count[e] = count[e] + 1 || 1,count), {})
    return Object.values(elementCount)
}