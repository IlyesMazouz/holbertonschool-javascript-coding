const http = require('http');
const countStudents = require('./3-read_file_async');

const PORT = 1245;

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    const databaseFile = process.argv[2];
    if (!databaseFile) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error: Database file not provided\n');
      return;
    }

    try {
      const data = await countStudents(databaseFile);
      res.setHeader('Content-Type', 'text/plain');
      res.end(`This is the list of our students\n${data}`);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`Internal Server Error: ${error.message}\n`);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

module.exports = app;
