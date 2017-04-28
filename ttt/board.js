function _makeGrid() {
  const grid = [];
  for (let i = 0; i < 3; i++) {
    grid.push(new Array(3).fill(" "));
  }
  return grid;
}

Array.prototype.transpose = function() {
  let newArray = [];
  this.forEach( (row, i) => {
    newArray.push(new Array());
    row.forEach( (el, j) => {
      newArray[i][j] = this[j][i];
    });
  });
  return newArray;
};

class Board {
  constructor() {
    this.grid = _makeGrid();
  }

  isOver() {
    return this.columns() || this.rows() || this.diagonals();
  }

  isTie() {
    return this.grid.every((row) => {
      return row.every((el) => el !== " ");
    });
  }

  rows() {
    return this.grid.some((row) => {
      return row[0] === row[1] &&
             row[0] === row[2] &&
             row[0] !== " ";
    });
  }

  columns() {
    const transposed = this.grid.transpose();
    return transposed.some((col) => {
      return col[0] === col[1] &&
             col[0] === col[2] &&
             col[0] !== " ";
    });
  }

  diagonals() {
    if (this.isEmpty([1,1])) return false;
    const g = this.grid;
    return (g[0][0] === g[1][1] && g[1][1] === g[2][2]) ||
          (g[2][0] === g[1][1] && g[1][1] === g[0][2]);
  }

  makeMove(pos, mark) {
    if (this.isEmpty(pos) && this.inBounds(pos)){
      this.grid[pos[0]][pos[1]] = mark;
      return true;
    } else {
      return false;
    }
  }

  inBounds(pos) {
    return pos[0] >= 0 && pos[0] < 3 && pos[1] >= 0 && pos[1] < 3;
  }

  isEmpty(pos) {
    return this.grid[pos[0]][pos[1]] === " ";
  }

  render() {
    this.grid.forEach( (line) => {
      console.log(line.join(" | "));
    });
  }

}

module.exports = Board;
