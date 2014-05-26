var _ = require('underscore');

var parser = module.exports = {};

parser.parseName = function (name) {
    var salutations = ['mr', 'master', 'mister', 'mrs', 'miss', 'ms', 'dr', 'prof', 'rev', 'fr', 'judge', 'honorable', 'hon']
        , suffixes = ['i', 'ii', 'iii', 'iv', 'v', 'senior', 'junior', 'jr', 'sr', 'phd', 'apr', 'rph', 'pe', 'md', 'ma', 'dmd', 'cme']
        , compound = ['vere', 'von', 'van', 'de', 'del', 'della', 'di', 'da', 'pietro', 'vanden', 'du', 'st.', 'st', 'la', 'lo', 'ter'];

    var parts = name.trim().split(/\s+/)
        , attrs = {};

    if (!parts.length) {
        return attrs;
    }

    if ( parts.length === 1 ) {
        attrs.firstName = parts[0];
    }

    if ( parts.length > 1 && _.indexOf(salutations, _.first(parts).toLowerCase().replace(/\./g, '')) > -1) {
        attrs.salutation = parts.shift();
        attrs.firstName = parts.shift();
    } else {
        attrs.firstName = parts.shift();
    }

    if ( parts.length > 1 && _.indexOf(suffixes, _.last(parts).toLowerCase().replace(/\./g, '')) > -1) {
        attrs.suffix = parts.pop();
        attrs.lastName = parts.pop();
    } else {
        attrs.lastName = parts.pop();
    }

    if ( parts.length && _.indexOf(compound, _.last(parts).toLowerCase().replace(/\./g, '')) > -1) {
        attrs.lastName = attrs.lastName + ' ' + parts.pop();
    }

    if ( parts.length ) {
        attrs.middleName = parts.join(' ');
    }

    //remove comma like "<lastName>, Jr."
    if ( attrs.lastName ) {
        attrs.lastName = attrs.lastName.replace(',', '');
    }

    //save a copy of original
    attrs.fullName = name;

    //console.log('attrs:', JSON.stringify(attrs));
    return attrs;
};
