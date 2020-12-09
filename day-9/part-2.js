const fs = require('fs');

const numbers = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');
const preamble = 25;

let weakNumber;
let encryptionWeakness;

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

const range = [...numbers].splice(0, preamble);

for (let index = preamble; index < numbers.length; index++) {
  const target = numbers[index];
  const input = [...numbers].splice(index - preamble, preamble);

  if (!isTwoSum(input, target)) {
    weakNumber = +target;
    break;
  }

  range.push(target);
}

for (let i = 0; i < range.length - 1; i++) {
  let number = +range[i];
  let numbers = [number];
  let sum = number;

  for (let j = (i + 1); j < range.length; j++) {
    let nextNumber = +range[j];
    sum += nextNumber;
    numbers.push(nextNumber);

    if (sum === weakNumber) {
      numbers = numbers.sort();
      encryptionWeakness = numbers[0] + numbers[numbers.length - 1];
      break;
    }
  }
}

console.log(`The weak number is: ${weakNumber}`);
console.log(`The encryption weakness is: ${encryptionWeakness}`);