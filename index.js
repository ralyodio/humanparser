const parser = module.exports = {};

if (!Array.prototype.hasOwnProperty('diff')) {
	Object.defineProperty(Array.prototype, 'diff', {
		enumerable: false,
		value: function(a2) {
			return this.concat(a2).filter((val, index, arr) => {
				return arr.indexOf(val) === arr.lastIndexOf(val);
			});
		}
	});
}

parser.parseName = function (name) {
	const salutations = ['mr', 'master', 'mister', 'mrs', 'miss', 'ms', 'dr', 'prof', 'rev', 'fr', 'judge', 'honorable', 'hon', 'tuan', 'sr', 'srta', 'br', 'pr', 'mx', 'sra'];
	const suffixes = ['i', 'ii', 'iii', 'iv', 'v', 'senior', 'junior', 'jr', 'sr', 'phd', 'apr', 'rph', 'pe', 'md', 'ma', 'dmd', 'cme', 'qc', 'kc'];
	const compound = ['vere', 'von', 'van', 'de', 'del', 'della', 'der', 'di', 'da', 'pietro', 'vanden', 'du', 'st.', 'st', 'la', 'lo', 'ter', 'bin', 'ibn', 'te', 'ten', 'op', 'ben', 'al'];

	let parts = name
		.trim()
		.replace(/\b\s+(,\s+)\b/, '$1') // fix name , suffix -> name, suffix
		.replace(/\b,\b/, ', ')         // fix name,suffix -> name, suffix
		.split(/\s+/);

	const attrs = {};

	if (!parts.length) {
		return attrs;
	}

	if (parts.length === 1) {
		attrs.firstName = parts[0];
	}

	//handle suffix first always, remove trailing comma if there is one
	if (parts.length > 1 && suffixes.indexOf(parts[parts.length - 1].toLowerCase().replace(/\./g, '')) > -1) {
		attrs.suffix = parts.pop();
		parts[parts.length - 1] = parts[parts.length - 1].replace(',', '');
	}

	//look for a comma to know we have last name first format
	const firstNameFirstFormat = parts.every(part => {
		return part.indexOf(',') === -1;
	});

	if (!firstNameFirstFormat) {
		//last name first format
		//assuming salutations are never used in this format

		//tracker variable for where first name begins in parts array
		let firstNameIndex;

		//location of first comma will separate last name from rest
		//join all parts leading to first comma as last name
		const lastName = parts.reduce((lastName, current, index) => {
			if (!Array.isArray(lastName)) {
				return lastName;
			}
			if (current.indexOf(',') === -1) {
				lastName.push(current);
				return lastName;
			} else {
				current = current.replace(',', '');

				// handle case where suffix is included in part of last name (ie: 'Hearst Jr., Willian Randolph')
				if (suffixes.indexOf(current.toLowerCase().replace(/\./g, '')) > -1) {
					attrs.suffix = current;
				} else {
					lastName.push(current);
				}

				firstNameIndex = index + 1;
				return lastName.join(' ');
			}
		}, []);

		attrs.lastName = lastName;

		var remainingParts = parts.slice(firstNameIndex);
		if (remainingParts.length > 1) {
			attrs.firstName = remainingParts.shift();
			attrs.middleName = remainingParts.join(' ');
		} else if (remainingParts.length) {
			attrs.firstName = remainingParts[0];
		}

		//create full name from attrs object
		const nameWords = [];
		if (attrs.firstName) {
			nameWords.push(attrs.firstName);
		}
		if (attrs.middleName) {
			nameWords.push(attrs.middleName)
		}
		nameWords.push(attrs.lastName)
		if (attrs.suffix) {
			nameWords.push(attrs.suffix);
		}
		attrs.fullName = nameWords.join(' ');


	} else {
		//first name first format


		if (parts.length > 1 && salutations.indexOf(parts[0].toLowerCase().replace(/\./g, '')) > -1) {
			attrs.salutation = parts.shift();

			// if we have a salutation assume 2nd part is last name
			if (parts.length === 1) {
				attrs.lastName = parts.shift();
			} else {
				attrs.firstName = parts.shift();
			}
		} else {
			attrs.firstName = parts.shift();
		}

		if (!attrs.lastName) {
			attrs.lastName = parts.length ? parts.pop() : '';
		}

		// test for compound last name, we reverse because middle name is last bit to be defined.
		// We already know lastname, so check next word if its part of a compound last name.
		const revParts = parts.slice(0).reverse();
		const compoundParts = [];

		revParts.every(part => {
			const test = part.toLowerCase().replace(/\./g, '');

			if (compound.indexOf(test) > -1) {
				compoundParts.push(part);

				return true;
			}

			//break on first non compound word
			return false;
		});

		//join compound parts with known last name
		if (compoundParts.length) {
			attrs.lastName = compoundParts.reverse().join(' ') + ' ' + attrs.lastName;

			parts = parts.diff(compoundParts);
		}

		if (parts.length) {
			attrs.middleName = parts.join(' ');
		}

		//remove comma like "<lastName>, Jr."
		if (attrs.lastName) {
			attrs.lastName = attrs.lastName.replace(',', '');
		}

		//save a copy of original
		attrs.fullName = name;

	}
	//console.log('attrs:', JSON.stringify(attrs));
	return attrs;
};

parser.getFullestName = (str) => {
	let name = str;
	let names = [];

	//find fullname from strings like 'Jon and Sue Doyle'
	if (name.indexOf('&') > -1 || name.toLowerCase().indexOf(' and ') > -1) {
		names = name.split(/\s+(?:and|&)\s+/gi);

		//pluck the name with the most parts (first, middle, last) from the array.
		//will grab 'Sue Doyle' in 'Jon & Sue Anne Doyle'
		if (names.length) {
			name = names.sort(function (a, b) {
				return b.split(/\s+/).length - a.split(/\s+/).length;
			})[0];
		}
	}

	return name;
};

parser.parseAddress = (str) => {
	str = str.replace(/\n/gi, ', ');
	//416 W. Manchester Blvd., Inglewood, CA  90301
	const parts = str.split(/,\s+/).reverse();
	let stateZip;
	let city;
	const address = {};

	stateZip = parts[0].split(/\s+/);
	parts.shift();

	city = parts.shift();

	address.address = parts.reverse().join(', ');
	address.city = city;
	address.state = stateZip[0];
	address.zip = stateZip[1];
	address.fullAddress = str;

	return address;
};
