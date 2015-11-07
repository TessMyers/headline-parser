var should = require('chai').should(),
    headlineP = require('../headline-parser.js'),
    findKeywords = headlineP.findKeywords;

var stubs = [
  {
    headline: 'Burkina Faso opposition parties, African Union reject army takeover',
    body: "OUAGADOUGOU (Reuters) - Burkina Faso's opposition parties, the United States and the African Union rejected the army's seizure of power in the West African country on Saturday after the resignation of President Blaise Compaore, setting the stage for fresh street protests.",
    n: 1,
    returnNonMatched: false,
    args: {language:"english", return_changed_case:false}
  },
  {
    headline: "absolutely exclamation final",
    body: "final exclamation exclamation absolutely absolutely absolutely",
    n: 3,
    returnNonMatched: false,
    args: {language:"english", return_changed_case:false},
  },
  {
    headline: "a the and if",
    body: "a the and if and a the if and",
    n: null,
    args: null,
    returnNonMatched: false,
  },
  {
    headline: "imperative otter shenanigans",
    body: "there are no mentions of the headline keywords in this sentence",
    n: 3,
    args: {language:"english", return_changed_case:false},
    returnNonMatched: false,
  },
]

describe('findKeywords', function() {
  it('should return single most relevant keyword from title', function() {
    findKeywords(stubs[0].headline, stubs[0].body, stubs[0].n, stubs[0].args, stubs[0].returnNonMatched).should.eql(['African']);
    findKeywords(stubs[1].headline, stubs[1].body, 1, stubs[1].args, stubs[1].returnNonMatched).should.eql(['absolutely']);
  });

  it('should return top three keywords sorted by relevance. ', function() {
    findKeywords(stubs[1].headline, stubs[1].body, stubs[1].n, stubs[1].args, stubs[1].returnNonMatched).should.eql(['final','exclamation','absolutely']);
  });

  it('should return all keywords when no N or args argument is given', function() {
    findKeywords(stubs[1].headline, stubs[1].body, null, null, null).should.eql(['final','exclamation','absolutely']);
  });

  it('should return empty array if given empty strings', function() {
    findKeywords('', '', stubs[2].n, stubs[2].args).should.eql([]);
  });

  it('should return empty array if headline has only stopwords', function() {
    findKeywords(stubs[2].headline, stubs[2].body, stubs[2].n, stubs[2].args, stubs[2].returnNonMatched).should.eql([]);
  });

  it('should return all sorted keywords if N is greater than number of keywords', function() {
    findKeywords(stubs[1].headline, stubs[1].body, 10, stubs[1].args, null).should.eql(['final','exclamation','absolutely']);
  });

  it('should return all sorted keywords if no N is given', function() {
    findKeywords(stubs[1].headline, stubs[1].body, null, stubs[1].args, null).should.eql(['final','exclamation','absolutely']);
  });

  it('Should return no keywords since returnNonMatched is set to to false', function() {
    findKeywords(stubs[3].headline, stubs[3].body, stubs[3].n, stubs[3].args, stubs[3].returnNonMatched).should.eql([]);
  });
  it('Should return no keywords since returnNonMatched defaults to false', function() {
    findKeywords(stubs[3].headline, stubs[3].body, stubs[3].n, stubs[3].args, null).should.eql([]);
  });
  it('Should return keywords even if no match since returnNonMatched is true', function() {
    findKeywords(stubs[3].headline, stubs[3].body, stubs[3].n, stubs[3].args, true).should.eql(['imperative','otter','shenanigans']);
  });
});
