import fs from 'fs';

export function readDatabase(path) {
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

        const result = {};
        for (const field in fieldCounts) {
          if (Object.prototype.hasOwnProperty.call(fieldCounts, field)) {
            result[field] = fieldCounts[field].names;
          }
        }

        resolve(result);
      }
    });
  });
}
