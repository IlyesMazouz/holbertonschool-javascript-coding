#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const filmsData = JSON.parse(body).results;
    const count = filmsData.filter(film => film.characters.includes('https://swapi-api.hbtn.io/api/people/18/')).length;
    console.log(count);
  }
});
