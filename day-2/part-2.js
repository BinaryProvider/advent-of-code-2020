const fs = require('fs');

const passwords = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');
const validPasswords = [];

passwords.forEach(input => {
  const parts = input.split(' ');
  const requirements = parts[0].split('-');
  const indexA = requirements[0] - 1;
  const indexB = requirements[1] - 1;
  const letter = parts[1].substr(0, 1);
  const password = parts[2];
  const charA = password[indexA];
  const charB = password[indexB];

  if (charA !== charB && (charA === letter || charB === letter)) {
    validPasswords.push(password);
  }
});

console.log(`Valid passwords: ${validPasswords.length}`);
