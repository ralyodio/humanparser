//TODO: parseName
//John A. Doe, CAI, CES, CAGA
//John (Johnnie) Doe
//John "Johnnie" Doe

//TODO: getUsableName(str, idx)
//John Doe & Jim Duncan
//John Doe, Senior Whatever


var chai = require('chai');
var expect = chai.expect;
var human = require('..');


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
			name: 'Mr. William R. Hugh Calum De La Cruz III',
			result: {
				salutation: 'Mr.',
				firstName: 'William',
				suffix: 'III',
				lastName: 'De La Cruz',
				middleName: 'R. Hugh Calum',
				fullName: 'Mr. William R. Hugh Calum De La Cruz III'
			}
		}, {
			name: 'William A. B. De La Cruz',
			result: {
				firstName: 'William',
				middleName: 'A. B.',
				lastName: 'De La Cruz',
				fullName: 'William A. B. De La Cruz'
			}
		}, {
			name: 'James Hugh Calum Laurie',
			result: {
				firstName: 'James',
				middleName: 'Hugh Calum',
				lastName: 'Laurie',
				fullName: 'James Hugh Calum Laurie'
			}
		}, {
			name: 'Kiefer William Frederick Dempsey George Rufus Sutherland',
			result: {
				firstName: 'Kiefer',
				middleName: 'William Frederick Dempsey George Rufus',
				lastName: 'Sutherland',
				fullName: 'Kiefer William Frederick Dempsey George Rufus Sutherland'
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
        }, {
            name: 'Hearst, William Jr',
            result: {
                firstName: 'William',
                suffix: 'Jr',
                lastName: 'Hearst',
                fullName: 'William Hearst Jr'
            }
        }, {
            name: 'Hearst, William Randolph',
            result: {
                firstName: 'William',
                lastName: 'Hearst',
                middleName: 'Randolph',
                fullName: 'William Randolph Hearst'
            }
        }, {
            name: 'Hearst, William, M.D.',
            result: {
                firstName: 'William',
                suffix: 'M.D.',
                lastName: 'Hearst',
                fullName: 'William Hearst M.D.'
            }
        }, {
            name: 'William',
            result: {
                firstName: 'William',
                lastName: '',
                fullName: 'William'
            }
        }, {
            name: '',
            result: {
                firstName: '',
                lastName: '',
                fullName: ''
            }
        }
    ];

    var fullest = [
        {
            name: 'John & Peggy Sue',
            result: {
                fullName: 'Peggy Sue'
            }
        }, {
            name: 'John and Peggy Sue',
            result: {
                fullName: 'Peggy Sue'
            }
        }, {
            name: 'Jane and Mr. William R. De La Cruz III',
            result: {
                fullName: 'Mr. William R. De La Cruz III'
            }
        }
    ];

    var addresses = [
        {
            address: '123 W. Happy Day Blvd., San Francisco, CA  90501',
            result: {
                address: '123 W. Happy Day Blvd.',
                city: 'San Francisco',
                state: 'CA',
                zip: '90501',
                fullAddress: '123 W. Happy Day Blvd., San Francisco, CA  90501'
            }
        }, {
            address: '123 Happy Street, Honolulu, HI  65780',
            result: {
                address: '123 Happy Street',
                city: 'Honolulu',
                state: 'HI',
                zip: '65780',
                fullAddress: '123 Happy Street, Honolulu, HI  65780'
            }
        }, {
            address: '123 Happy Street, Suite #101, Honolulu, HI  65780',
            result: {
                address: '123 Happy Street, Suite #101',
                city: 'Honolulu',
                state: 'HI',
                zip: '65780',
                fullAddress: '123 Happy Street, Suite #101, Honolulu, HI  65780'
            }
        }
    ];

    it('Should parse all name attributes', function() {
        names.forEach(function(name, i, list){
            var parsed = human.parseName(name.name);

            expect(name.result).to.eql(parsed);
        });
    });

    it('Should parse fullest name', function() {
        fullest.forEach(function(name, i, list){
            var fullName = human.getFullestName(name.name);

            expect(name.result.fullName).to.eql(fullName);
        });
    });

    it('Should parse all address attributes', function() {
        addresses.forEach(function(address, i, list){
            var parsed = human.parseAddress(address.address);

            expect(address.result).to.eql(parsed);
        });
    });
});
