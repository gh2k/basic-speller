'use strict';

var chai = require('chai');
var expect = chai.expect;

var Speller = require('../lib/speller.js');
const wordsFile = 'words.json';

describe('Speller', function() {
  it('isCorrect() should return false on an unknown word', function() {
    var speller = new Speller(wordsFile);
    expect(speller.isCorrect('blorg')).to.equal(false);
  });

  it('isCorrect() should return true on a known word', function() {
    var speller = new Speller(wordsFile);
    expect(speller.isCorrect('selection')).to.equal(true);
  });

  it('isCorrect() should match case-insensitively', function() {
    var speller = new Speller(wordsFile);
    expect(speller.isCorrect('SeLeCtIoN')).to.equal(true);
  });

  it('isCorrect() should return false on a null object', function() {
    var speller = new Speller(wordsFile);
    expect(speller.isCorrect(null)).to.equal(false);
    expect(speller.isCorrect(undefined)).to.equal(false);
  });

  it('isCorrect() should return false on a non-string', function() {
    var speller = new Speller(wordsFile);
    expect(speller.isCorrect(5)).to.equal(false);
    expect(speller.isCorrect(true)).to.equal(false);
  });

  it('should raise an error when loaded with an invalid file', function() {
    expect(() => Speller('.gitignore')).to.throw(SyntaxError);
  });

  it('should raise an error when loaded with a missing file', function() {
    expect(() => Speller('blorg.json')).to.throw(Error, 'ENOENT');
  });
});
