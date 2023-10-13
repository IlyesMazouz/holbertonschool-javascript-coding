const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        const fieldCounts = {};

        for (let i = 1; i < lines.length; i += 1) {
          const [firstName, , , field] = lines[i].split(',');
          if (field) {
            fieldCounts[field] = fieldCounts[field] || { count: 0, names: [] };
            fieldCounts[field].count += 1;
            fieldCounts[field].names.push(firstName.trim());
          }
        }

        console.log(`Number of students: ${lines.length - 1}`);
        for (const field in fieldCounts) {
          if (Object.prototype.hasOwnProperty.call(fieldCounts, field)) {
            console.log(`Number of students in ${field}: ${fieldCounts[field].count}. List: ${fieldCounts[field].names.join(', ')}`);
          }
        }
        resolve();
      }
    });
  });
}

module.exports = countStudents;
