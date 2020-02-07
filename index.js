//Guessing Game Project - Burlington Code Academy
// started 2.5.20
// due Monday, Feb. 10 by 9 a.m.
// Written by Rob Mitchell

//set the standard input 
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

// starts game using function
function guessGame() {
  let guessCount = 0; //Sets initial count for guesses
  let maxRange = 100; //Sets initial max range for guessing
  let minRange = 0; //Sets initial minimum range for guessing
  //sets up user
  console.log("Let's play a guessing game where you (human) make up\n a number and I (computer) try to guess it!")
  //starts async function
  async function start() {
    let rightGuess = null;
    //asks for an upper bound to the guessing range
    maxRange = (await ask("Think of a number between zero and...what (this will give me an upper limit)?"))
    //function that calculates the max number of guesses using binary search algorithm
    //then console logs that for user
    guessNum(maxRange);
    //starts while loop to run while condition is no correct guess
    while (rightGuess !== "y" || "yes") {
      //to use binary search method, first guess will be median
      //Then the guess re-sets to the new median between min and max range
      let initialGuess = Math.round(maxRange - ((maxRange - minRange) / 2)); 
      //starts guessing here 
      rightGuess = (await ask("Is it... " + initialGuess + "? (Y/N)?")).trim().toLowerCase();
      //adds one to the guess count, in order to show number of guesses upon success
      guessCount += 1;
      // response when (if) computer guesses correctly - yes, a little attitude
      if (rightGuess === "y") {
        console.log("Haha! I got it in only " + guessCount + " guesses!")
        process.exit();
      } else { //Asks whether higher or lower
        let rangeType = (await ask("Is it higher (h) or lower (l)?")).trim().toLowerCase();
        //if - else loop to check whether higher or lower
        if (rangeType === "h") {
          //resets minRange to the guess plus one
          minRange = initialGuess += 1;
          console.log("minRange reset to: " + minRange);
          console.log("maxRange is " + maxRange)
        } else if (rangeType === "l") {
          //resets maxRange to guess plus one
          maxRange = initialGuess -= 1; 
          console.log("minRange is " + minRange)
          console.log("maxRange reset to: " + maxRange);
        } else {
          //kicks back out an error message if the char is not readable
          console.log("I don't recognize that character... \nPlease use the letter 'L' for lower, or 'H' for higher.");
        }
      }
    }
  }
  start();
}
guessGame();

//input function for async input
function ask(questionText) {
  return new Promise(function (resolve, reject) {
    readlineInterface.question(questionText, resolve);
  });
}

//random number generator - not used when doing binary search algorithm
function randomInt(max, min) {
  return Math.floor(min + (Math.random() * (max - min + 1)))
}

//function to generate the projected max number of guesses 
function guessNum(max) {
  let topEnd = max;
  let result = 0;
  let guessCount = 1;
  //uses worst case calculation for binary search algorithm
  while (result <= topEnd) {
    result = Math.pow(2, guessCount);
    guessCount += 1;
  }
  console.log("Well... I should be able to guess that in " + (guessCount - 1) + " guesses or less!");
  console.log(result)
}