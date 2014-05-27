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

    var names = [
        {
            name: 'Mr. William R. Hearst, III',
            result: {
                salutation: 'Mr.',
                firstName: 'William',
                middleName: 'R.',
                lastName: 'Hearst',
                suffix: 'III',
                fullName: 'Mr. William R. Hearst, III'
            }
        },{
            name: 'William Randolph Hearst',
            result: {
                firstName: 'William',
                lastName: 'Hearst',
                middleName: 'Randolph',
                fullName: 'William Randolph Hearst'
            }
        }, {
            name: 'William R. De La Cruz',
            result: {
                firstName: 'William',
                lastName: 'De La Cruz',
                middleName: 'R.',
                fullName: 'William R. De La Cruz'
            }
        }, {
            name: 'Mr. William R. De La Cruz III',
            result: {
                salutation: 'Mr.',
                firstName: 'William',
                suffix: 'III',
                lastName: 'De La Cruz',
                middleName: 'R.',
                fullName: 'Mr. William R. De La Cruz III'
            }
        }, {
            name: 'William De Cruz',
            result: {
                firstName: 'William',
                lastName: 'De Cruz',
                fullName: 'William De Cruz'
            }
        }, {
            name: 'William De La Cruz',
            result: {
                firstName: 'William',
                lastName: 'De La Cruz',
                fullName: 'William De La Cruz'
            }
        }, {
            name: 'William Hearst',
            result: {
                firstName: 'William',
                lastName: 'Hearst',
                fullName: 'William Hearst'
            }
        }, {
            name: 'William Hearst Jr',
            result: {
                firstName: 'William',
                suffix: 'Jr',
                lastName: 'Hearst',
                fullName: 'William Hearst Jr'
            }
        }
    ];

    // The tests have an English description...
    it('Should parse all attributes', function() {
        names.forEach(function(name, i, list){
            var parsed = human.parseName(name.name);

            expect(name.result).to.eql(parsed);
        });
    });
});
