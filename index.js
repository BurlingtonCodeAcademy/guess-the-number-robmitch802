//Guessing Game Project - Burlington Code Academy
// started 2.5.20
// due Monday, Feb. 10 by 9 a.m.
// Rob Mitchell

const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function guessGame() {
  let guessCount = 0; //Sets initial count for guesses
  let maxRange = 100; //Sets initial max range for guessing
  let minRange = 0; //Sets initial minimum range for guessing
  console.log("Let's play a guessing game where you (human) make up a number and I (computer) try to guess it")

  async function start() {
    let numGuess = null;
    maxRange = (await ask("Think of a number between zero and what?"))
    while (numGuess !== "y") {
      let initialGuess = randomInt(maxRange, minRange);
      //starts guessing here
      numGuess = (await ask("Is it... " + initialGuess + "? (Y/N)?")).trim().toLowerCase();
      guessCount += 1;
      if (numGuess === "y") {
        console.log("Haha! I got it in only " + guessCount + " guesses!")
        process.exit();
      } else {
        let rangeType = (await ask("Is it higher (h) or lower (l)?")).trim().toLowerCase();
        //
        if (rangeType === "h") {
          minRange = initialGuess += 1;
          console.log("minRange reset to: " + minRange);//resets minimum to guess + 1
          console.log("maxRange is " + maxRange)
        } else if (rangeType === "l") {
          maxRange = initialGuess -= 1;
          console.log("maxRange reset to: " + maxRange);//resets maximum range to -1
          console.log("minRange is " + minRange)
        } else {
          console.log("I don't recognize that character...");
        }
      }
    }
  }
  start();
}
guessGame();

// let answer = (await ask("Is it higher (H) or lower (L)?")).trim().toLowerCase();
//if higher, set lower bound to 50 (incl); if lower, set upper bound to 49 (incl)

//function that resets the range based on user answer
function rangeReset(rangeTrigger) {
  while (rangeTrigger === "h") {
    minRange = ((maxRange / 2) + 1);
    console.log(minRange)
  }
  while (rangeTrigger === "l") {
    minRange = ((maxRange / 2) - 1);
    console.log(maxRange);
  }
}

//input function for async input
function ask(questionText) {
  return new Promise(function (resolve, reject) {
    readlineInterface.question(questionText, resolve);
  });
}

//random number generator
function randomInt(max, min) {
  return Math.floor(min + (Math.random() * (max - min + 1)))
}