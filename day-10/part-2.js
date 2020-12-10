const fs = require('fs');

let ratings = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n').map(
  number => +number
).sort((a, b) => a - b);

ratings = [0, ...ratings, ratings[ratings.length - 1]];

let index = 0;
let difference = 0;
let distinctWays = 1;

const multiplyDistinctWays = {
  ["2"]: (distinctWays) => distinctWays * 2,
  ["3"]: (distinctWays) => distinctWays * 4,
  ["4"]: (distinctWays) => distinctWays * 7,
}

while (index < ratings.length - 1) {
  if (ratings[index + 1] - ratings[index] === 1) {
    difference++;
    index++;
    continue;
  }

  if (difference > 1) {
    distinctWays = multiplyDistinctWays[difference](distinctWays)
  }

  difference = 0;
  index++;
}

console.log(`Total number of distinct ways to arrange the adapters: ${distinctWays}`);