const fs = require('fs');

const grid = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');

let x = 3;
let numberOfTrees = 0;

for (let y = 1; y < grid.length; y++) {
  const row = grid[y];
  const cells = row.split('');
  const value = cells[x];

  if (value === '#') {
    numberOfTrees++;
  }

  x += 3;

  if (x >= cells.length) {
    x = (x - cells.length);
  }
}

console.log(`Number of trees encountered: ${numberOfTrees}`);