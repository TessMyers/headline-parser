eklem-headline-parser
===============

A forked version of [TessMyers](https://github.com/TessMyers) [headline-parser](https://github.com/TessMyers/headline-parser) [NPM package](https://www.npmjs.org/package/headline-parser) that determines the most relevant keywords in a headline by considering article context.

## Installation

    $ npm install headline-parser
  
Use the `--save` flag to include the module in your package.json
  
## Usage

Require the parser

```javascript
var headline_parser = require("headline-parser");

// Declare variables for your headline and article summary. These have been edited to provide a good example.

var headline = 'China successfully develops drone defense system';

var body = 'china has tested a self-developed laser defense system against small-scale low-altitude drones, state media said on Sunday. Reportedly, the drone defense is designed to destroy small-scale drones flying within an altitude of 500 meters and at speeds below 50 meters per second. In addition to the drone network, china has developed stealth jets and has built one aircraft carrier.';

// Find the most relevant keywords in the headline, sorted by number of appearances in the body text
var important_keywords = headline_parser.findKeywords(headline, body, 3);

// => Returns the top three occuring words [ 'china', 'drone', 'defense' ], with 'defense' appearing most often.
```


#### Arguments

findKeywords() accepts four arguments, of which the last two are optional. 

    .findKeywords(headline, body [, n][, args][, returnNonMatched]);

| Argument name | Description | Permitted values |
|---------------|-------------|------------------|
| headline| Headline of article | String|
| body | Context from the article. May be the entire article body, or just a few sample sentences. The more context, the greater the accuracy of the parser.| String|
| (optional) n | Number of top keywords desired. If left out, the parser will return all keywords sorted by relevance. | Integer |
| (optional) args | Takes an object containing parameters for the [keyword-extractor module](https://www.npmjs.org/package/keyword-extractor) used to pull keywords from the headline. Default is {language:"english", return_changed_case:true} | Object (see [docs](https://www.npmjs.org/package/keyword-extractor))|
| (optional) returnNonMatched | Whether or not to return keywords from headline when no matches in body. If left out, and no match, the parser will default to {returnNonMatched:false} and not return any keywords. | Boolean |

## Running tests

Install the development dependencies by running the following command:

    $ npm install
  
To run tests:

    $ npm test
  
# How does it work?

It's pretty simple. This parser uses the [keyword-extractor](https://www.npmjs.org/package/keyword-extractor) module to obtain keywords from a headline (all non-stopwords), then sorts those words by how many times each word appears in the article body provided. For example, this is a great tool to use with the Twitter API if you plan to search or stream tweets that relate to a specific news article.

Some things to note: The module will not count partial appearances of keywords, or compounded keywords. For instance, if one of your headline keywords is ['china'], then neither "China", "china's" or "Indochina" will be counted as an appearance of that keyword. Additionally, unless the `args` object is supplied with  a `return_changed_case: false` parameter, the module will count only the lowercase appearances of the word.
