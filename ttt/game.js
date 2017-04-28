const Board = require('./board.js');

class Game {
  constructor(reader) {
    this.reader = reader;
    this.player = "X";
    this.board = new Board();
  }

  swapPlayers() {
    this.player = (this.player === "X") ? "O" : "X";
  }

  prompt(callback) {
    console.log(`Current Player: ${this.player}`);
    this.reader.question("Input Position: ", (response) => {
      const pos = response.split(",").map( el => parseInt(el) );
      callback(pos);
    });
  }

  run(completionCallback) {
    this.board.render();

    this.prompt((pos) => {
      const success = this.board.makeMove(pos, this.player);
      if (!success) {
        console.log("invalid move");
        this.run(completionCallback);
      } else {
        if (this.board.isOver()) {
          this.board.render();
          console.log(`Player ${this.player} wins!!`);
          completionCallback();
        } else if (this.board.isTie()){
          this.board.render();
          console.log(`No winner. Time for checkers.`);
          completionCallback();
        } else {
          this.swapPlayers();
          this.run(completionCallback);
        }
      }
    });
  }
}

module.exports = Game;
