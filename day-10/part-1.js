const fs = require('fs');

const ratings = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n').map(number => +number).sort((a, b) => a - b);

let index = 0;
let adapters = [];
let lookup = [1, 2, 3];
let joltCount = [0, 0, 0];

let rating;

while (true) {
  if (index === ratings.length) {
    adapters.push(rating + 3);
    joltCount[2]++;
    break;
  }

  rating = ratings[index];

  const foundIndex = lookup.findIndex(num => num === rating);

  if (foundIndex !== -1) {
    joltCount[foundIndex]++;
    adapters.push(rating);
    lookup = [rating + 1, rating + 2, rating + 3];
  }

  index++;
}

console.log(`1-jolt * 3-jolt = ${joltCount[0] * joltCount[2]}`); 