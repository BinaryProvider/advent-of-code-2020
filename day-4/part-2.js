const fs = require('fs');

const input = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n\n');;

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const isValid = {
  'byr': (input) => String(input).length === 4 && input >= 1920 && input <= 2002,
  'iyr': (input) => String(input).length === 4 && input >= 2010 && input <= 2020,
  'eyr': (input) => String(input).length === 4 && input >= 2020 && input <= 2030,
  'hgt': (input) => {
    const reg = /([0-9]+)(cm|in)/;
    const matches = (String(input).match(reg) || []).map(e => e.replace(reg, '$1'));;
    if (!matches || matches.length !== 3) return false;

    const value = matches[1];
    const unit = matches[2];
    const valid = unit === 'cm' ? value >= 150 && value <= 193 : value >= 59 && value <= 76;

    return valid;
  },
  'hcl': (input) => (/(#[a-zA-Z0-9]{6})/).test(input),
  'ecl': (input) => (/(\bamb\b|\bblu\b|\bbrn\b|\bgry\b|\bgrn\b|\bhzl\b|\both\b)/).test(input), 
  'pid': (input) => (/\b([0-9]){9}\b/).test(input), 
}

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
  return requiredFields.every(field => fields.includes(field) && isValid[field](passport[field]));
}).length;

console.log(`Number of valid passports: ${numValidPassports}`);