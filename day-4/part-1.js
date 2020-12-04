const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n\n');;

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const passports = input.map(data => {
  data = data.replace(/[\n\r]/g, ' ');

  const fields = data.split(' ').map(field => {
    const values = field.split(':');
    const name = values[0];
    const value = values[1];
    return {
      [name]: value
    };
  });

  const passport = {};

  fields.forEach(field => {
    return Object.assign(passport, field);
  })

  return passport;
});

const numValidPassports = passports.filter(passport => {
  const fields = Object.keys(passport);
  return requiredFields.every(field => fields.includes(field));
}).length;

console.log(`Number of valid passports: ${numValidPassports}`);