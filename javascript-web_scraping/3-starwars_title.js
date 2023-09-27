#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];

const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

request.get(apiUrl, (error, response, body) => {
  if (error) {
    process.exit(1);
  }

  try {
    const movieData = JSON.parse(body);
    if (movieData.title) {
      console.log(movieData.title);
    }
  } catch (parseError) {
    process.exit(1);
  }
});
