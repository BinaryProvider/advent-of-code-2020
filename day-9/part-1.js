const fs = require('fs');

const numbers = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');
const preamble = 25;

let weakNumber;

const isTwoSum = (input, target) => {
  const lookup = {};

  input.forEach((num, index) => {
    lookup[num] = index;
  });

  return input.some((num, index) => {
    const diff = target - num;
    return (lookup.hasOwnProperty(diff) && lookup[diff] !== index)
  });
}

for (let index = preamble; index < numbers.length; index++) {
  const target = numbers[index];
  const input = [...numbers].splice(index - preamble, preamble);
  if (!isTwoSum(input, target)) {
    weakNumber = target;
    break;
  }
}

console.log(`The weak number is: ${weakNumber}`);