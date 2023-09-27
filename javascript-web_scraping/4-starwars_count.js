#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];
const characterId = '18';

request(apiUrl, (error, response, body) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  const filmsData = JSON.parse(body).results;
  const matchingMovies = filmsData.filter(film =>
    film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)
  );

  console.log(matchingMovies.length);
});
