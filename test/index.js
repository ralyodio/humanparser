//TODO: parseName
//Randy S. Burdette, CAI, CES, CAGA
//Randy S. Burdette, CAI, CES, CAGA
//Robert (Bobby) Jones

//TODO: getUsableName(str, idx)
//Matt Rymarski & Julie Schalm
//Ros & Jim Higgins
//Brent Roberts and Devon Rogers
//Jim Brashier, Senior Broker Associates


var chai = require('chai')
    , expect = chai.expect
    , human = require('..');


// `describe` makes a "suite" of tests; think of them as a group.
describe('Parsing names', function() {

    // The tests have an English description...
    it('Should parse all attributes', function() {
        var name = 'Mr. William R. Hearst, III'
            , attrs = human.parseName(name);

      //  console.log(attrs);

        expect(attrs.salutation).to.be.equal('Mr.');
        expect(attrs.firstName).to.be.equal('William');
        expect(attrs.middleName).to.be.equal('R.');
        expect(attrs.lastName).to.be.equal('Hearst');
        expect(attrs.suffix).to.be.equal('III');
        expect(attrs.fullName).to.be.equal(name);
    });

    it('Should parse first, middle, last', function(){
        var name = 'William Randolph Hearst'
            , attrs = human.parseName(name);

    //    console.log(attrs);
        expect(attrs.salutation).to.be.undefined;
        expect(attrs.firstName).to.be.equal('William');
        expect(attrs.middleName).to.be.equal('Randolph');
        expect(attrs.lastName).to.be.equal('Hearst');
        expect(attrs.suffix).to.be.undefined;
        expect(attrs.fullName).to.be.equal(name);
    });

    it('Should parse compound last name', function(){
        var name = 'William R. De La Cruz'
            , attrs = human.parseName(name);

  //      console.log(attrs);
        expect(attrs.salutation).to.be.undefined;
        expect(attrs.firstName).to.be.equal('William');
        expect(attrs.middleName).to.be.equal('R.');
        expect(attrs.lastName).to.be.equal('De La Cruz');
        expect(attrs.suffix).to.be.undefined;
        expect(attrs.fullName).to.be.equal(name);
    });

    it('Should parse compound with all attributes', function(){
        var name = 'Mr. William R. De La Cruz III'
            , attrs = human.parseName(name);

//        console.log(attrs);
        expect(attrs.salutation).to.be.equal('Mr.');
        expect(attrs.firstName).to.be.equal('William');
        expect(attrs.middleName).to.be.equal('R.');
        expect(attrs.lastName).to.be.equal('De La Cruz');
        expect(attrs.suffix).to.be.equal('III');
        expect(attrs.fullName).to.be.equal(name);
    });

    it('Should parse first and last name', function(){
        var name = 'William Hearst'
            , attrs = human.parseName(name);

        expect(attrs.salutation).to.be.undefined;
        expect(attrs.firstName).to.be.equal('William');
        expect(attrs.middleName).to.be.undefined;
        expect(attrs.lastName).to.be.equal('Hearst');
        expect(attrs.suffix).to.be.undefined;
        expect(attrs.fullName).to.be.equal(name);
    });
});
