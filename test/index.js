//Matt Rymarski & Julie Schalm
//Robert (Bobby) Jones

// First, we require `expect` from Chai.
var chai = require('chai')
    , expect = chai.expect
    , human = require('..');

// `describe` makes a "suite" of tests; think of them as a group.
describe('Parsing names', function() {

    // The tests have an English description...
    it('Attributes', function() {
        var name = 'Mr. William R. Jenkins, III'
            , attrs = human.parseName(name);

        expect(attrs.salutation).to.be.equal('Mr.');
        expect(attrs.firstName).to.be.equal('William');
        expect(attrs.middleName).to.be.equal('R.');
        expect(attrs.lastName).to.be.equal('Jenkins');
        expect(attrs.suffix).to.be.equal('III');
        expect(attrs.fullName).to.be.equal(name);
    });
});