var extractor = require('keyword-extractor');

module.exports = {
  findKeywords: findKeywords
}

var findKeywords = function( headline, body, n, keywordArgs ){
  n = n || 1;
  keywordArgs = keywordArgs || { language:"english", return_changed_case:true };

  // Warn user if body or headline is not properly formatted
  if (typeof body != 'string') { console.log('Whoops, you need to include a string for the body argument');};
  if (typeof headline != 'string') { console.log('Whoops, you need to include a string for the headline argument');}

  body = body.split(' ');

  // Extract keywords from headline. Returns an array
  keywordArray = extractor.extract( headline, keywordArgs );

  // Create object to track each mention of keyword in summary
  keywordCount = {};
  keywordArray.map(function(word){ keywordCount[word] = 0; });

  // Iterate over summary to count mentions of each keyword
  for ( var i = 0; i < body.length; i++ ) {
    for (var word in keywordCount) {
      // console.log(word, body[i]);
      if (word === body[i]){
        keywordCount[word] += 1;
      }
    }
  }

  // Sort keywords by highest number of mentions
  var sortedKeys = Object.keys(keywordCount).sort(function(a,b){return keywordCount[a] - keywordCount[b];});

  // Return last n important words, will return maximum if n is greater than max.
  return sortedKeys.slice(-n)


}

var x = findKeywords('stuff',' stuff stuff and', 1)

console.log(x)
