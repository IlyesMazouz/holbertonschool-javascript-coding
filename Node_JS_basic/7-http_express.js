const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const PORT = 1245;
const databasePath = process.argv[2];

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const studentsData = await countStudents(databasePath);
    res.send(`This is the list of our students\n${studentsData}`);
  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

module.exports = app;
