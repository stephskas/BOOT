"use strict";

/* CONNECT FOUR
- Game takes two players who will alternate turns.	- Game takes two players who will alternate turns.
- Player 1 will be red and Player 2 will be blue.	- Player 1 will be red and Player 2 will be blue.
- On each turn, the player will click on the game board	- On each turn, the player will click on the game board
where they want to drop their piece.	where they want to drop their piece.
- A player wins by getting four-in-a row (horizontally, vertically or diagonally).	- A player wins by getting four-in-a row (horizontally, vertically or diagonally).
- The game ends when a player wins or the board is full and the game is a draw.	- The game ends when a player wins or the board is full and the game is a draw.
*/

document.addEventListener("DOMContentLoaded", () => {

  class Game {
    constructor(player1Color, player2Color, rowCount, colCount) {
      this.players = [player1Color, player2Color]
      // this.gameOver = false;
      this.rowCount = rowCount
      this.colCount = colCount
      this.renderGame()
      this.play()
      this.checkForWin()
      this.resetGame()
    }

    renderGame() {
      let container = document.getElementById("container")
      this.createHeaders()
      this.createBoard()
      this.createResetBtn()
      container.append(header, gameStatus, table, reset)
    }
    createHeaders() {
      let header = document.createElement("h1")
      header.innerText = "CONNECT4"
      let gameStatus = document.createElement("h3")
      gameStatus.innerText = "Player 1" // Start with player 1
    }
    createBoard() {
      let playerPlacements = [];
      let table = document.createElement("table");
      table.setAttribute("id", "gameboard")
      for (let r = 0; r < 6; r++) {
        let row = document.createElement("tr");
        row.setAttribute("id", `${r}`);
        playerPlacements.push(Array.from({ length: `${colCount.value}` }));
        console.log("playerPlacements: " + playerPlacements);
        console.log("colCount: " + colCount[0]);
        for (let c = 0; c < 7; c++) {
          console.log(this);
          let slot = document.createElement("td");
          slot.classList.add("slot");
          slot.setAttribute("id", `${c}`);
          slot.addEventListener("click", handleSlotClick);
          row.append(slot);
        }
        table.appendChild(row);
      }
    }
    createResetBtn() {
      let reset = document.createElement("button");
      resetGame = this.resetGame.bind(this);
      reset.addEventListener("click", this.resetGame);
      reset.innerText = "PLAY AGAIN";
    }
    // PLAY
    handleSlotClick(e) {
      console.log("e: " + e);
      let selectedRow = +e.target.parentElement.id;
      let selectedCol = +e.target.id;
      //   console.log(`Col: ${selectedCol}`)
      //   console.log(`Row: ${selectedRow}`);
      let tableRows = document.getElementsByTagName("tr");
      let tableCells = document.getElementsByTagName("td");
      // console.log(tableCells[selectedCol]);
      // console.log(player);
      // Check selected column for empty space starting from bottom row
      for (var i = 5; i >= 0; i--) {
        let selected = tableRows[i].children[selectedCol];
        if (!selected.classList.contains("selected")) {
          // Add player number to player placement array
          this.playerPlacements[i][selectedCol] = this.player;
          // Check for win
          if (checkForWin()) {
            setTimeout(handleWin, 500); // 500ms = 1/2sec
          }
          // Check for draw (42 total slots filled)
          if (document.querySelectorAll("td.selected").length === 42) {
            document.getElementsByTagName("h3")[0].innerText = `DRAW!`;
            // return null;
          }
          if (player === 1) {
            selected.style.backgroundColor = player1Color;
            document.getElementsByTagName("h3")[0].innerText = "Player 1";
            player = 2;
          } else {
            document.getElementsByTagName("h3")[0].innerText = "Player 2";
            selected.style.backgroundColor = player2Color;
            player = 1;
          }
          selected.classList.add("selected")
          // return null;
        }
      }
    }

    // CHECK FOR WIN
    checkForWin() {
        // Check player placement array for four in a row of the same player numbers and within range
        const win = slots => 
        slots.every(
          ([r, c]) =>
            r >= 0 &&
            r < 6 &&
            c >= 0 &&
            c < 7 &&
            this.playerPlacements[r][c] === this.player
        );
      
      // Iterate through all slots to test winning positions
      for (let r = 5; r >= 0; r--) {
        // 6-rows
        for (let c = 0; c < 7; c++) {
          // 7-columns
          const horizontal = [
            [r, c],
            [r, c + 1],
            [r, c + 2],
            [r, c + 3],
          ];
          const vertical = [
            [r, c],
            [r + 1, c],
            [r + 2, c],
            [r + 3, c],
          ];
          const diagDownLeft = [
            [r, c],
            [r + 1, c + 1],
            [r + 2, c + 2],
            [r + 3, c + 3],
          ];
          const diagDownRight = [
            [r, c],
            [r + 1, c - 1],
            [r + 2, c - 2],
            [r + 3, c - 3],
          ];
          // return winner (checking each win possibility only as needed)
          if (
            _win(horizontal) ||
            _win(vertical) ||
            _win(diagDownLeft) ||
            _win(diagDownRight)
          ) {
            return true;
          }
        }
      }
    }
  
    handleWin() {
      document.getElementsByTagName("h3")[0].innerText = `PLAYER ${this.player} WINS!`;
      slot.removeEventListener("click", this.resetGame);
      // return null;
    }
  
    resetGame() {
      location.reload();
    }
    
  }

  class Player {
    constructor(color) {
      this.color = color;
    }
  }

  document.getElementById("startBtn").addEventListener("click", () => {
      let player1Color = document.getElementById("player1Color").value;
      let player2Color = document.getElementById("player2Color").value;
      if(player1Color === undefined || player2Color === undefined) { 
    // use default red and blue values
        let player1Color = "#e55050"; 
        let player2Color = "#434a66";
      }  
      let rowCount = +(document.getElementById("rowCount").value);
      let colCount = +(document.getElementById("colCount").value);
        if (rowCount === undefined || colCount === undefined) {
          // use default red and blue values
          let rowCount = +6;
          let colCount = +7;
        }  
      new Game (player1Color, player2Color, rowCount, colCount);
  });

});