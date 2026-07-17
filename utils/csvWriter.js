const fs = require('fs');
const path = require('path');

const HEADER = 'Title,Author,Publisher';

function escapeCsvField(value) {
  if (value.includes(',') || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Writes a single book's details to output/book-details.csv.
 * Overwrites the file on each run so re-running tests doesn't append duplicates.
 */
function writeBookDetails({ title, author, publisher }) {
  const row = [title, author, publisher].map(escapeCsvField).join(',');
  const outputDir = path.join(__dirname, '..', 'output');
  const filePath = path.join(outputDir, 'book-details.csv');

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(filePath, `${HEADER}\n${row}\n`);

  return filePath;
}

module.exports = { writeBookDetails };
