#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const filmsData = JSON.parse(body).results;
    const characterId = '18';
    const count = filmsData.reduce((acc, film) => {
      if (film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)) {
        return acc + 1;
      }
      return acc;
    }, 0);
    console.log(count);
  }
});
