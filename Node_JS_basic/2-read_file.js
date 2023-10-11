const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

    const lines = data.split('\n').filter((line) => line.trim() !== '');

    lines.shift();

    const fieldCount = {};

    lines.forEach((line) => {
      const fields = line.split(',').map((field) => field.trim());

      if (fields.length >= 2) {
        const field = fields[fields.length - 1];
        const name = fields[0];

        if (!fieldCount[field]) {
          fieldCount[field] = {
            count: 1,
            names: [name],
          };
        } else {
          fieldCount[field].count += 1;
          fieldCount[field].names.push(name);
        }
      }
    });

    console.log(`Number of students: ${lines.length}`);
    for (const field in fieldCount) {
      if (fieldCount.hasOwnProperty(field)) {
        console.log(`Number of students in ${field}: ${fieldCount[field].count}. List: ${fieldCount[field].names.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
