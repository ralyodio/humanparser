humanparser
=========

[![NPM](https://nodei.co/npm/humanparser.png)](https://nodei.co/npm/humanparser/)

[![Build Status](https://travis-ci.org/chovy/humanparser.svg?branch=master)](https://travis-ci.org/chovy/humanparser) [![Requirements Status](https://requires.io/github/chovy/humanparser/requirements.png?branch=master)](https://requires.io/github/chovy/humanparser/requirements/?branch=master)

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


The MIT License (MIT)