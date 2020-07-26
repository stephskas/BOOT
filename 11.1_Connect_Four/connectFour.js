// Declare variables for table tr and td nodelists, h3 with gameStatus class and reset button
const tr = document.getElementsByTagName('tr');
const td = document.getElementsByTagName('td');
const gameStatus = document.querySelector('#gameStatus')
const reset = document.querySelector('#reset');

// Request player names
while(!player1){
  var player1 = prompt('Player One: Enter your name. You will be red.')
}
while (!player2) {
  var player2 = prompt('Player Two: Enter your name. You will be black.')
}

// Start game with player 1 and set message to Player 1 name
var currentPlayer = 1;
gameStatus.textContent = `${player1}'s turn!`;

// Add an event listener to each cell and set background of each cell
[...td].forEach( cell => {
  cell.addEventListener('click', changeColor);
  cell.style.backgroundColor = 'white';
});

// Player 1 color will be red, Player 2 color will be black 
function changeColor(e){
  let tdIdx = e.target.cellIndex;
  for (let i = 5; i > -1; i--){
    if(tr[i].children[tdIdx].style.backgroundColor === "white"){
      if(currentPlayer === 1) {
        tr[i].children[tdIdx].style.backgroundColor = 'red';
        if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()){
          gameStatus.style.color = 'red';
          gameStatus.textContent = (`${player1} wins!`);
          return alert('player1 wins');
        } else if(drawCheck()) {
          gameStatus.textContent = ('Game is a draw');
          return alert('draw!');;
        } else {
          gameStatus.textContent = `${player2}'s turn!`;
          return currentPlayer = 2;
        }  

      } else { //if currentPlayer === 2
        tr[i].children[tdIdx].style.backgroundColor = 'black';
        gameStatus.textContent = `${player1}'s turn!`;
          if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
            gameStatus.style.color = 'black';
            gameStatus.textContent = (`${player2} wins!`);
            return alert('player2 wins');
          } else if (drawCheck()) {
            gameStatus.textContent = ('Game is a draw');
            return alert('draw!');
          } else {
            gameStatus.textContent = `${player1}'s turn!`;
            return currentPlayer = 1;
          }  
      }
    }
  }
}

// CHECK FOR WIN
function colorMatchCheck(one, two, three, four){
  return(one === two && one === three && one === four && one !== 'white');
}

function horizontalCheck() {
  for(let row = 0; row < tr.length; row++) {
    for(let col = 0; col < 4; col++){
      if (colorMatchCheck(tr[row].children[col].style.backgroundColor,
        tr[row].children[col + 1].style.backgroundColor,
        tr[row].children[col + 2].style.backgroundColor, 
        tr[row].children[col + 3].style.backgroundColor)){
          return true;
      }
    }    
  }
}

function verticalCheck() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if(colorMatchCheck(tr[row].children[col].style.backgroundColor, 
        tr[row + 1].children[col].style.backgroundColor,
        tr[row + 2].children[col].style.backgroundColor,
        tr[row + 3].children[col].style.backgroundColor)){
          return true;
      }
    }
  }
}

function diagonalCheck1() {
  for(let col = 0; col < 4; col++){
    for(row = 0; row < 3; row++) {
      if(colorMatchCheck(tr[row].children[col].style.backgroundColor,
        tr[row + 1].children[col + 1].style.backgroundColor,
        tr[row + 2].children[col +2].style.backgroundColor,
        tr[row + 3].children[col + 3].style.backgroundColor)){
          return true;
      }
    }  
  }
}

function diagonalCheck2() {
  for (let col = 0; col < 4; col++) {
    for (row = 5; row > 2; row--) {
      if (colorMatchCheck(tr[row].children[col].style.backgroundColor,
        tr[row - 1].children[col + 1].style.backgroundColor,
        tr[row - 2].children[col + 2].style.backgroundColor,
        tr[row - 3].children[col + 3].style.backgroundColor)) {
        return true;
      }
    }
  }
}

function drawCheck() {
  let fullSlot = [];
  for(let i = 0; i < td.length; i++) {
    if (td[i].style.backgroundColor !== 'white') {
      fullSlot.push(td[i]);
    }
  }
  if (fullSlot.length === td.length) {
    return true;
  }
}

reset.addEventListener('click', () => {
  [...td].forEach(slot => {
    slot.style.backgroundColor = 'white';
  });
  return (currentPlayer === 1 ? gameStatus.textContent = `${player1}'s turn` : gameStatus.textContent = `${player2}'s turn`);
})