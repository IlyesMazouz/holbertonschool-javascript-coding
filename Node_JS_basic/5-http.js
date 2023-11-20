const http = require('http');
const countStudents = require('./3-read_file_async');

const PORT = 1245;

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const result = await countStudents(process.argv[2]);
      res.end(`This is the list of our students\n${result}`);
    } catch (error) {
      res.statusCode = 500;
      res.end(`Internal Server Error: ${error.message}`);
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found\n');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

module.exports = app;
