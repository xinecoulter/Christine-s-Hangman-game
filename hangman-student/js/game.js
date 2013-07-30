var word = {
  secretWord: "",
  wordList: ['ruby', 'rails', 'javascript', 'array', 'hash', 'underscore', 'sinatra', 'model', 'controller', 'view', 'devise', 'authentication', 'capybara', 'jasmine', 'cache', 'sublime', 'terminal', 'system', 'twitter', 'facebook', 'function', 'google', 'amazon', 'development', 'data', 'design', 'inheritance', 'prototype', 'gist', 'github', 'agile', 'fizzbuzz', 'route', 'gem', 'deployment', 'database'],

  // Selects a random word from the word list sets the secret word
  setSecretWord: function(){
    var randomIndex = _.random(0, this.wordList.length);
    this.secretWord = this.wordList[randomIndex];
  },

  // Takes an array of letters as input and returns an array of two items:
  // 1) A string with the parts of the secret word that have been guessed correctly and underscore for the parts that haven't
  // 2) An array of all the guessed letters that were not in the secret word
  checkLetters: function(guessedLetters){
    var targetWord = this.secretWord;
    var guessedCorrectly = [];
    // Fills guessedCorrectly array with _'s
    for (var i = 0; i < targetWord.length; i++) {
      guessedCorrectly.push("_");
    }
    var guessedIncorrectly = [];

    // Iterates through each letter in guessedLetters array.
    // If a letter in the guessedLetters array appears in targetWord, the _ in guessedCorrectly at that index of targetWord gets replaced with the letter.
    // If not, the letter gets added to the guessedIncorrectly array.
    _.each(guessedLetters, function(guessedLetter) {
      if (_.contains(targetWord, guessedLetter)) {
        for (var j = 0; j < targetWord.length; j++) {
          if (targetWord[j] === guessedLetter) {
            guessedCorrectly[j] = guessedLetter;
          }
        }
      } else {
        guessedIncorrectly.push(guessedLetter);
      }
    });

    guessedCorrectly = guessedCorrectly.join("");
    return [guessedCorrectly, guessedIncorrectly];
  }
};

var player = {
  MAX_GUESSES: 8,
  guessedLetters: null,

  // Takes a new letter as input and updates the game
  makeGuess: function(guess){
    this.guessedLetters = guess;
    game.updateDisplay(word.checkLetters(this.guessedLetters)[0], this.guessedLetters, (this.MAX_GUESSES - word.checkLetters(this.guessedLetters)[1].length));
  },

  // Check if the player has won and end the game if so
  checkWin: function(wordString){
    if (wordString === word.secretWord) {
      alert("You win!");
    }
  },

  // Check if the player has lost and end the game if so
  checkLose: function(wrongLetters){
    if (wrongLetters.length === this.MAX_GUESSES) {
      document.getElementById("wordString").innerText = word.secretWord;
      alert("You lose!");
    }
  }
};

var game = {
  // Resets the game
  resetGame: function(){
    word.setSecretWord();
    player.guessedLetters = null;
    this.updateDisplay(null, null, null);
    document.getElementById("letterField").value = null;
  },

  // Reveals the answer to the secret word and ends the game
  giveUp: function(){
    document.getElementById("wordString").innerText = word.secretWord;
    alert("Game over!");
  },

  // Update the display with the parts of the secret word guessed, the letters guessed, and the guesses remaining
  updateDisplay: function(secretWordWithBlanks, guessedLetters, guessesLeft){
    document.getElementById("wordString").innerText = secretWordWithBlanks;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    document.getElementById("guessesLeft").innerText = guessesLeft;
  }
};

window.onload = function(){
  // Start a new game
  game.resetGame();
  // Add event listener to the letter input field to grab letters that are guessed
  document.getElementById("letterField").onkeyup = function(event){
    var guess = document.getElementById("letterField").value;
    player.makeGuess(guess);
    player.checkWin(word.checkLetters(player.guessedLetters)[0]);
    player.checkLose(word.checkLetters(player.guessedLetters)[1]);
  };
  // Add event listener to the reset button to reset the game when clicked
  document.getElementById("resetButton").onclick = function(event){
    game.resetGame();
  };
  // Add event listener to the give up button to give up when clicked
  document.getElementById("giveUpButton").onclick = function(event){
    game.giveUp();
  };
};