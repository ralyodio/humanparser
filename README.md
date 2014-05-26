humanparser
=========

Parse a human name string into salutation, first name, middle name, last name, suffix.

## Install

    npm install humanparser

## Usage

    var human = require('humanparser');

    var fullName = 'Mr. William R. Hearst, III'
        , attrs = human.parseName(fullName);

    console.log(attrs);

    //produces the following output
    
    { saluation: 'Mr.',
      firstName: 'William',
      suffix: 'III',
      lastName: 'Hearst',
      middleName: 'R.',
      fullName: 'Mr. William R. Hearst, III' }
