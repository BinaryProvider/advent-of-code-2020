const fs = require('fs');

const passwords = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');
const validPasswords = [];

passwords.forEach(input => {
  const parts = input.split(' ');
  const requirements = parts[0].split('-');
  const min = requirements[0];
  const max = requirements[1];
  const letter = parts[1].substr(0, 1);
  const password = parts[2];

  const lookup = {};
  let i = password.length;
  while (i--) {
    if (lookup[password.charAt(i)]) {
      lookup[password.charAt(i)]++;
    } else {
      lookup[password.charAt(i)] = 1;
    }
  }

  if (lookup[letter] >= min && lookup[letter] <= max) {
    validPasswords.push(password);
  }
});

console.log(`Valid passwords: ${validPasswords.length}`);
