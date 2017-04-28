const Game = require("./towers.js");

const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const completionCallback = () => {
  console.log("Congranulations! you won!");
  reader.question("Would you like to play again? (y/n) ", (response) => {
    if (response === 'y') {
      new Game(reader).run(completionCallback);
    } else {
      console.log("BYE FOREVER );");
      reader.close();
    }
  });
};

new Game(reader).run(completionCallback);
