//TODO: parseName
//John A. Doe, CAI, CES, CAGA
//John (Johnnie) Doe
//John "Johnnie" Doe

//TODO: getUsableName(str, idx)
//John Doe & Jim Duncan
//John Doe, Senior Whatever


const chai = require('chai');
const expect = chai.expect;
const human = require('..');


// `describe` makes a "suite" of tests; think of them as a group.
describe('Parsing names', () => {
	const names = [
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
		}, {
			name: '"Franců Franců", Jan',
			result: {
				firstName: 'Jan',
				lastName: 'Franců Franců',
				fullName: 'Jan Franců Franců',
			}
		}, {
			name: 'McDermott, Drew V.',
			ignoreSuffix: [ 'i', 'v' ],
			result: {
				firstName: 'Drew',
				fullName: 'Drew V. McDermott',
				lastName: 'McDermott',
				middleName: 'V.'
			}
		}, {
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
			name: 'Hearst Jr., William Randolph',
			result: {
				firstName: 'William',
				lastName: 'Hearst',
				middleName: 'Randolph',
				suffix: 'Jr.',
				fullName: 'William Randolph Hearst Jr.'
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
			name: 'Mr. Hearst',
			result: {
				salutation: 'Mr.',
				lastName: 'Hearst',
				fullName: 'Mr. Hearst'
			}
		}, {
			name: 'Mr. Hearst Jr.',
			result: {
				salutation: 'Mr.',
				lastName: 'Hearst',
				suffix: 'Jr.',
				fullName: 'Mr. Hearst Jr.'
			}
		}, {
			name: 'hussain al robeh',
			result: {
				firstName: 'hussain',
				lastName: 'al robeh',
				fullName: 'hussain al robeh'
			}
		}, {
			name: 'EUGENE L. NATH,JR.',
			result: {
				firstName: 'EUGENE',
				middleName: 'L.',
				lastName: 'NATH',
				suffix: 'JR.',
				fullName: 'EUGENE L. NATH,JR.'
			}
		}, {
			name: 'LEE TANT , JR',
			result: {
				firstName: 'LEE',
				lastName: 'TANT',
				suffix: 'JR',
				fullName: 'LEE TANT , JR'
			}
		}, {
			name: '',
			result: {
				firstName: '',
				lastName: '',
				fullName: ''
			}
		}, {
			name: 'Tuan Syed Azmin Nur',
			result: {
				salutation: 'Tuan',
				firstName: 'Syed',
				middleName: 'Azmin',
				lastName: 'Nur',
				fullName: 'Tuan Syed Azmin Nur'
			}
		}
	];

	const fullest = [
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

	const extras = [
		{
			name: 'John Jones 3rd',
			opts: {
				extraSuffixes: ['3rd']
			},
			result: {
				firstName: 'John',
				lastName: 'Jones',
				suffix: '3rd',
				fullName: 'John Jones 3rd'
			}
		},
		{
			name: 'Doc Emmett Brown',
			opts: {
				extraSalutations: ['Doc']
			},
			result: {
				firstName: 'Emmett',
				lastName: 'Brown',
				salutation: 'Doc',
				fullName: 'Doc Emmett Brown'
			}
		},
		{
			name: 'Marcy Tre Lane',
			opts: {
				extraCompound: ['Tre']
			},
			result: {
				firstName: 'Marcy',
				lastName: 'Tre Lane',
				fullName: 'Marcy Tre Lane'
			}
		},
		{
			name: 'John Jones Jr',
			opts: {
				ignoreSuffix: ['Jr']
			},
			result: {
				firstName: 'John',
				middleName: 'Jones',
				lastName: 'Jr',
				fullName: 'John Jones Jr'
			}
		},
		{
			name: 'Mister T',
			opts: {
				ignoreSalutation: ['Mister']
			},
			result: {
				firstName: 'Mister',
				lastName: 'T',
				fullName: 'Mister T'
			}
		},
		{
			name: 'William De La Cruz',
			opts: {
				ignoreCompound: ['De']
			},
			result: {
				firstName: 'William',
				lastName: 'La Cruz',
				middleName: 'De',
				fullName: 'William De La Cruz'
			}
		}
	];

	const addresses = [
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
		}, {
			// parse newlines as commas
			address: '1234 California St.\nApt. #594\nSan Francisco, CA 94109',
			result: {
				address: '1234 California St., Apt. #594',
				city: 'San Francisco',
				state: 'CA',
				zip: '94109',
				fullAddress: '1234 California St., Apt. #594, San Francisco, CA 94109'
			}
		}
	];

	it('Should parse all name attributes', () => {
		names.forEach((name, i, list) => {
			const parsed = human.parseName(name.name, name.ignoreSuffix);

			expect(name.result).to.eql(parsed);
		});
	});

	it('Should parse fullest name', () => {
		fullest.forEach((name, i, list) => {
			const fullName = human.getFullestName(name.name);

			expect(name.result.fullName).to.eql(fullName);
		});
	});

	it('Should parse names using extra configuration', () => {
		extras.forEach((name, i, list) => {
			const parsed = human.parseName(name.name, name.opts);

			expect(name.result).to.eql(parsed);
		});
	});

	it('Should parse all address attributes', () => {
		addresses.forEach((address, i, list) => {
			const parsed = human.parseAddress(address.address);

			expect(address.result).to.eql(parsed);
		});
	});
});
