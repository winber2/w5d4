class Game {
  constructor(reader) {
    this.stacks = [[1],[2],[4,3]];
    this.reader = reader;
  }

  promptMove(processMove) {
    this.reader.question("take from? ", (startTowerIdx) => {
      this.reader.question("Place on? ", (endTowerIdx) => {
        // console.log(`start ${startTowerIdx}, end ${endTowerIdx}`);
        // console.log(this.isValidMove(startTowerIdx, endTowerIdx));
        processMove(startTowerIdx, endTowerIdx);
      });
    });
  }

  isInBounds(start, end) {
    return start >= 0 && start < 3 && end >= 0 && end < 3 && start !== end;
  }

  isValidMove(start, end) {
    if (!(this.isInBounds(start, end))) {
      return false;
    }

    const t1 = this.stacks[start];
    const t2 = this.stacks[end];

    if (t1.length === 0) {
      return false;
    } else if (t2.length === 0) {
      return true;
    } else {
      return (t1[t1.length - 1] < t2[t2.length - 1]);
    }
  }

  move(start, end) {
    const valid = this.isValidMove(start, end);
    if (valid) {
      this.stacks[end].push(this.stacks[start].pop());
    }
    return valid;
  }

  isWon() {
    if (this.stacks[0].length > 0) {
      return false;
    } else if (this.stacks[1].length === 4 || this.stacks[2].length === 4){
      return true;
    }
    return false;
  }

  run(completionCallback) {
    console.log(this.stacks);
    this.promptMove((start, end) => {
      const success = this.move(start, end);

      if (!success) {
        console.log('invalid move');
      }

      if (this.isWon()) {
        console.log(this.stacks);
        completionCallback();
      } else {
        this.run(completionCallback);
      }
    });
  }
}

module.exports = Game;
