const fs = require('fs');

const data = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n\n').map(question => question.replace(/[\n\r]/g, ''));
let sumYes = 0;

data.forEach(input => {
  const replies = [...new Set(input.split(''))];
  sumYes += replies.length;
});

console.log(`Sum of YES questions: ${sumYes}`);

