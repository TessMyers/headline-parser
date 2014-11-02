var should = require('chai').should(),
    headlineP = require('../headline-parser.js'),
    findKeywords = headlineP.findKeywords;

var stubs = [
  {
    headline: 'Burkina Faso opposition parties, African Union reject army takeover',
    body: "OUAGADOUGOU (Reuters) - Burkina Faso's opposition parties, the United States and the African Union rejected the army's seizure of power in the West African country on Saturday after the resignation of President Blaise Compaore, setting the stage for fresh street protests.",
    n: 1,
    args: {language:"english", return_changed_case:false}
  },
  {
    headline: "absolutely exclamation final",
    body: "final exclamation exclamation absolutely absolutely absolutely",
    n: 3,
    args: {language:"english", return_changed_case:true},
  },
  {
    headline: "a the and if",
    body: "a the and if and a the if and",
    n: null,
    args: null,
  },
  {
    headline: "imperative otter shenanigans",
    body: "there are no mentions of the headline keywords in this sentence",
    n: null,
    args: {language:"english", return_changed_case:true},
  },
]

describe('findKeywords', function() {
  it('should return single most relevant keyword from title', function() {
    findKeywords(stubs[0].headline, stubs[0].body, stubs[0].n, stubs[0].args).should.eql(['African']);
    findKeywords(stubs[1].headline, stubs[1].body, 1, stubs[1].args).should.eql(['absolutely']);
  });

  it('should return top three keywords sorted by relevance. ', function() {
    findKeywords(stubs[1].headline, stubs[1].body, stubs[1].n, stubs[1].args).should.eql(['final','exclamation','absolutely']);
  });

  it('should return all keywords when no N or args argument is given', function() {
    findKeywords(stubs[1].headline, stubs[1].body, null, null).should.eql(['final','exclamation','absolutely']);
  });

  it('should return empty array if given empty strings', function() {
    findKeywords('', '', stubs[2].n, stubs[2].args).should.eql([]);
  });

  it('should return empty array if headline has only stopwords', function() {
    findKeywords(stubs[2].headline, stubs[2].body, stubs[2].n, stubs[2].args).should.eql([]);
  });

  it('should return all sorted keywords if N is greater than number of keywords', function() {
    findKeywords(stubs[1].headline, stubs[1].body, 10, stubs[1].args).should.eql(['final','exclamation','absolutely']);
  });

  it('should return all sorted keywords if no N is given', function() {
    findKeywords(stubs[1].headline, stubs[1].body, null, stubs[1].args).should.eql(['final','exclamation','absolutely']);
  });

  it('should log an error if the headline keywords are not relevant to the article', function() {
    findKeywords(stubs[3].headline, stubs[3].body, stubs[3].n, stubs[3].args).should.eql('Sorry, this headline appears to be completely irrelevant to the article body. Here are your keywords anyway: imperative, otter, shenanigans');
  });
});
