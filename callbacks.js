class Clock {
  constructor() {
    const date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
  }

  _tick() {
    this.seconds = (this.seconds + 1) % 60;
    if (this.seconds === 0) {
      this.minutes = (this.minutes + 1) % 60;
      if (this.minutes === 0) {
        this.hours = (this.hours + 1) % 24;
      }
    }
    // console.log(this);
    this.printTime();
  }
}

// const clock = new Clock();

const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



const addNumbers = (sum, numsLeft, completionCallback) => {
  if (numsLeft === 0) {
    reader.close();
    completionCallback(sum);
  } else {
    reader.question("type in a number: ", (num1) => {
      sum += parseInt(num1);
      console.log(`sum: ${sum}`);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  }
};


// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}?  `, (response) => {
    if (response === 'yes') {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function innerBubbleSortLoop(array, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < array.length - 1) {
    askIfGreaterThan(array[i], array[i + 1], (isGreaterThan) => {
      if (isGreaterThan) {
        let next_num = array[i + 1];
        array[i + 1] = array[i];
        array[i] = next_num;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(array, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  } else {

    outerBubbleSortLoop(madeAnySwaps);
  }
}

const absurdBubbleSort = (arr, sortCompletionCallback) => {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
};

// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });

Function.prototype.myBind = function(context) {
  return () => this.apply(context);
};

class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function() {
   console.log("Turning on " + this.name);
};

const lamp = new Lamp();

turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"



//
