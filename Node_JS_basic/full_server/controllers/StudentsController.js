import { readDatabase } from '../utils.js';

class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const data = await readDatabase('./database.csv');
      const formattedResponse = [];

      for (const field in data) {
        const students = data[field];
        const formattedList = `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`;
        formattedResponse.push(formattedList);
      }

      const finalResponse = ['This is the list of our students', ...formattedResponse];
      response.status(200).send(finalResponse.join('\n'));
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    response.status(200).send(`List of students in ${major}...`);
  }
}

export { StudentsController };
