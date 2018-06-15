// global cached collection of known words
var knownWords = {};

/**
 * gets the spelling state of `word`
 * @param word - word to check
 * @returns (string):
 *   'valid': correctly spelled
 *   'invalid': incorrectly spelled
 *   'unknown': word state has not yet been determined
 **/
function getWordState(word) {
  var state = 'unknown';
  if (knownWords[word]) {
    // return the state, if known
    state = knownWords[word].state;
  } else {
    // if we don't know the state, we need to query it.
    knownWords[word] = {'state': 'unknown'};

    // create a new request to query the spelling API
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/spelling/' + word, true);

    // callback for API response:
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        //console.log('received response ' + xhr.responseText + ' for word ' + word);
        var response = JSON.parse(xhr.responseText);

        // update the cached word state based on the response
        knownWords[word].state =
          response.valid ? 'valid' : 'invalid';

        // re-update the output with the new word state
        updateOutputContent();
      }
    };
    xhr.send();
  }

  return state;
}

/**
 * Updates the output HTML content to contain the typed words, with a css class
 * to show whether they are spelled correctly
 */
function updateOutputContent() {
  // break up the input text into an array for processing
  var wordsToCheck = document.getElementById('spellcheck_input')
    .value.split(/\s+/);
  //TODO: handle newlines

  var outputHTML = '';

  // get the css class for each word, triggering a lookup for unknown words
  // then, append a span with the matching class to show the state
  wordsToCheck.forEach(function(word) {
    var cssClass = getWordState(word);

    outputHTML += '<span class="' + cssClass + '">' + word + '</span> ';
  });

  document.getElementById('output').innerHTML = outputHTML;
}

// set the oninput event of the textarea to call the update method
window.onload = function() {
  document.getElementById('spellcheck_input').oninput = updateOutputContent;
};
