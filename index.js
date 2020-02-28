//Guessing Game Project - Burlington Code Academy
// started 2.5.20
// due Monday, Feb. 10 by 9 a.m.
// Written by Rob Mitchell
// Binary search algorithm version 

//set the standard input 
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

//initial variables
let maxRange = 100; //Sets initial max range for guessing
let minRange = 0; //Sets initial minimum range for guessing
let guessCount = 0; //Sets initial count for guesses
let rightGuess = null;

//start function
//sets up user
//starts async function
async function start() {
  console.log("Let's play a guessing game where you (human) \nmake up a number and I (computer) try to guess it!")
  //asks for an upper bound to the guessing range
  maxRange = (await ask("To play I need a range of numbers to guess. How about \nbetween zero and your choice. How high can I guess?")).parseInt()
  //function that calculates the max number of guesses using binary search algorithm
  //then console logs that for user
}

function guessGame() {
    guessNum(maxRange);
    //starts while loop to run while condition is no correct guess
    while (rightGuess !== "y" && "yes") {
      //to use binary search method, first guess will be median
      //Then the guess re-sets to the new median between min and max range, rounding up
      let numGuess = Math.round(maxRange - ((maxRange - minRange) / 2)); 
      //starts guessing here 
      rightGuess = (await ask("Is it... " + numGuess + "? (Y/N)?")).trim().toLowerCase();
      //adds one to the guess count, in order to show number of guesses upon success
      guessCount += 1;
      // response when (if) computer guesses correctly - yes, a little attitude
      if (rightGuess === "y" || "yes") {
        console.log("Haha! I got it in only " + guessCount + " guesses!")
        process.exit();
      } else { //Asks whether higher or lower
        let rangeType = (await ask("Is it higher (use the letter 'H') or lower (use 'L')?")).trim().toLowerCase();
        //if - else loop to check whether higher or lower
        if (rangeType === "h") {
          //resets minRange to the guess plus one
          minRange = numGuess += 1;
        } else if (rangeType === "l") {
          //resets maxRange to guess plus one
          maxRange = numGuess -= 1; 
        } else {
          //kicks back out an error message if the char is not readable
          console.log("I don't recognize that character... \nPlease use the letter 'L' for lower, or 'H' for higher.");
        }
      }
    }
  }
// starts game using function
start();

guessGame();

//input function for async input
function ask(questionText) {
  return new Promise(function (resolve, reject) {
    readlineInterface.question(questionText, resolve);
  });
}

//function to generate the projected max number of guesses 
function guessNum(max) {
  let topEnd = max;
  let result = 0;
  let guessCount = 1;
  //uses worst case calculation for binary search algorithm max guesses
  while (result <= topEnd) {
    result = Math.pow(2, guessCount);
    guessCount += 1;
  }
  console.log("Well... wtih that range, I should be able to guess your number in " + (guessCount - 1) + " guesses or less!");
  //console.log(result)
}