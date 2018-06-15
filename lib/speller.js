'use strict';

var fs = require('fs');

/**
 * Constructs a new Speller object with the specified list of words
 * @param wordsFile - path to a json file containing a list of words as an array
 * @constructor
 */
function Speller(wordsFile) {
  this.words = JSON.parse(fs.readFileSync(wordsFile, 'utf8'));
}

/**
 * Returns whether or not a word is spelled correctly according to the loaded
 * dictionary
 * @param word - word to check
 * @returns {boolean}
 */
Speller.prototype.isCorrect = function(word) {
  return typeof word === 'string' && 
    this.words.indexOf(word.toLowerCase()) > -1;
};

module.exports = Speller;
