'use strict';

// start with a basic 'express' server
var express = require('express');
var app = express();

const port = 8080;
const wordsFile = 'words.json';

// create the spell checker
var Speller = require('./lib/speller.js');
var speller = new Speller(wordsFile);

// for the spelling endpoint, return a json object defining whether the word
// is correctly spelled
app.route('/spelling/:word?')
  .get(function(req, res) {
    res.json({
      "valid": speller.isCorrect(req.params.word)
    });
  });

// serve static content from the 'static' directory
app.use(express.static('static'));

// listen on the port specified above
var server = app.listen(port);

module.exports = server;

