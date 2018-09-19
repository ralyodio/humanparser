humanparser
=========

[![NPM](https://nodei.co/npm/humanparser.png)](https://nodei.co/npm/humanparser/)

[![Build Status](https://travis-ci.org/chovy/humanparser.svg?branch=master)](https://travis-ci.org/chovy/humanparser) [![Requirements Status](https://requires.io/github/chovy/humanparser/requirements.png?branch=master)](https://requires.io/github/chovy/humanparser/requirements/?branch=master)

Parse a human name string into salutation, first name, middle name, last name, suffix.

## Install

    npm install humanparser

## Usage

    const human = require('humanparser');
    
### parse human name    

    const fullName = 'Mr. William R. Hearst, III';
	const attrs = human.parseName(fullName);

    console.log(attrs);

    //produces the following output
    
    { 
        saluation: 'Mr.',
        firstName: 'William',
        suffix: 'III',
        lastName: 'Hearst',
        middleName: 'R.',
        fullName: 'Mr. William R. Hearst, III'
    }
      
### get fullest name in string

    const name = 'John & Peggy Sue';
    const fullName = human.getFullestName(name);

    //produces the following output
    {
        fullName: 'Peggy Sue'
    }
      
### parse address

    const address = '123 Happy Street, Honolulu, HI  65780';
    const parsed = human.parseAddress(address);
    
    //produces the following output    
    {
        address: '123 Happy Street',
        city: 'Honolulu',
        state: 'HI',
        zip: '65780',
        fullAddress: '123 Happy Street, Honolulu, HI  65780'
    }

