import express from 'express';
import { readDatabase } from './utils';
import { AppController } from './controllers/AppController.js';
import { StudentsController } from './controllers/StudentsController.js';

const app = express();
const port = 1245;

app.get('/', AppController.getHomepage);

app.get('/students', async (req, res) => {
  try {
    const database = await readDatabase('./database.csv');
    StudentsController.getAllStudents(req, res, database);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Cannot load the database');
  }
});

app.get('/students/:major', async (req, res) => {
  const { major } = req.params;
  if (major !== 'CS' && major !== 'SWE') {
    return res.status(500).send('Major parameter must be CS or SWE');
  }

  try {
    const database = await readDatabase('./database.csv');
    StudentsController.getAllStudentsByMajor(req, res, database, major);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Cannot load the database');
  }
});

app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});

export default app;
