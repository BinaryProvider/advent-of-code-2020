const fs = require('fs');

const data = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n\n');
let sumYes = 0;

data.forEach(input => {
  const numPersons = input.split(/[\n\r]/g);
  const replies = input.replace(/[\n\r]/g, '');
  const yesReplies = replies.split('');

  const commonReplies = {};
  yesReplies.forEach(reply => {
    commonReplies[reply] = isNaN(commonReplies[reply]) ? 1 : commonReplies[reply] + 1;
  })

  Object.keys(commonReplies).forEach(key => {
    sumYes += commonReplies[key] === numPersons.length ? 1 : 0;
  });
});

console.log(`Sum of YES questions: ${sumYes}`);

