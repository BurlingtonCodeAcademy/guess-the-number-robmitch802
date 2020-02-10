//Guessing Game Project - Burlington Code Academy
// started 2.5.20
// due Monday, Feb. 10 by 9 a.m.
// Written by Rob Mitchell
// Role reversal - computer thinks of a number, human guesses
// reversed from original index.js file 

//set the standard input 
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

//Begins with computer asking to play a game
function guessHuman() {
    let guessCount = 1; //Sets initial count for guesses. Sets to one b/c first guess is outside count loop
    //sets up user
    console.log("Let's play a guessing game where you (human) \ntry to guess a number that I (computer) have chosen!")
    //starts async function
    async function start() {
        let rightGuess = null;
        //asks for an lower bound to the guessing range
        let minRange = (await ask("Let's set a range for you to guess between. \nHow low can the number I pick be?")).trim();
        //asks for the upper bound
        let maxRange = (await ask("How high can the number be?"));
        //repeats back the range
        console.log("Okay, I'm thinking of a number between " + minRange + " and " + maxRange + ".");
        //computer picks the number, assigned to randomNum
        let randomNum = randomInt(maxRange, minRange);
        console.log(randomNum)
        //starts the game by asking for the first guess
        let humGuess = (await ask("What's your first guess?"));
        //game loop starts, will run as long as human guess is incorrect
        while (humGuess !== randomNum) {
            //sets code for a guess outside the agreed-upon range
            if (humGuess > maxRange) {
                console.log("Hey pal - you're guessing outside the range we agreed to. See ya!");
                process.exit();
            } else if (humGuess < minRange) {
                console.log("Hey pal - you're guessing outside the range we agreed to. See ya!");
                process.exit();
            } else if (randomNum > humGuess) { //clause for a guess higher than number
                console.log("Not it - my number is higher than " + humGuess + ". Try again.")
                humGuess = (await ask("What's your next guess?")).trim();
            } else if (randomNum < humGuess) { //clause for a guess lower than number
                console.log("Not it - my number is lower than " + humGuess + ". Try again.")
                humGuess = (await ask("What's your next guess?")).trim();
            } else { //successful guess
                console.log("Hey - you've got it! That's my number! It only took you " + guessCount + " guesses!")
                process.exit();
            } guessCount += 1; //Adds one to the guesscount
            console.log("guess count is " + guessCount)
        }
    }
    start();
}
guessHuman();

//input function for async input
function ask(questionText) {
    return new Promise(function (resolve, reject) {
        readlineInterface.question(questionText, resolve);
    });
}

//random number generator - not used when doing binary search algorithm
function randomInt(max, min) {
    return Math.floor((Math.random() * max) + min)
}