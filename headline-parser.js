var extractor = require('keyword-extractor');

var findKeywords = function( headline, body, n, keywordArgs, returnNonMathched ){
  keywordArgs = keywordArgs || { language:"english", return_changed_case:true };

  body = body.split(' ');

  // Extract keywords from headline. Returns an array
  keywordArray = extractor.extract( headline, keywordArgs );

  // if no N is given, set n to max length. // todo: just set to infinity?
  n = n || keywordArray.length;

  // Create object to track each mention of keyword in summary
  keywordCount = {};
  keywordArray.map(function(word){ keywordCount[word] = 0; });

  // Iterate over summary to count mentions of each keyword
  for ( var i = 0; i < body.length; i++ ) {
    for (word in keywordCount) {
      // console.log(word, body[i]);
      if (word === body[i]){
        keywordCount[word] += 1;
      }
    }
  }

  // If no keywords have been mentioned, and 'returnNonMathched == true' return non matched keywords from headline
  var aboveZero = Object.keys(keywordCount).filter(function(key){ return keywordCount[key] > 0; })

  if (Object.keys(keywordCount).length > 1 && aboveZero.length < 1) {
    var unSortedKeys = keywordArray.join(', ');
    return unSortedKeys;
  }


  // Sort keywords by highest number of mentions
  var sortedKeys = Object.keys(keywordCount).sort(function(a,b){return keywordCount[a] - keywordCount[b];});

  // Return last n important words, will return maximum if n is greater than max.
  return sortedKeys.slice(-n);
}


module.exports = {
  findKeywords: findKeywords
}
