#!/usr/bin/node

const request = require('request');
const apiUrl = process.argv[2];
const characterId = 18;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.log(error);
    return;
  }

  const films = JSON.parse(body).results;
  const matchingMovies = films.filter(film =>
    film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)
  );

  console.log(matchingMovies.length);
});
