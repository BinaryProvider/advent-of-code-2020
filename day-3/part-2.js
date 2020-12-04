const fs = require('fs');

const grid = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');

function countTreesEncountered(stepsRight, stepsDown) {
  let x = stepsRight;
  let numberOfTrees = 0;
  
  for (let y = stepsDown; y < grid.length; y += stepsDown) {
    const row = grid[y];
    const cells = row.split('');
    const value = cells[x];
  
    if (value === '#') {
      numberOfTrees++;
    }
  
    x += stepsRight;
  
    if (x >= cells.length) {
      x = (x - cells.length);
    }
  }

  return numberOfTrees;
}

const result = {
  "Right 1, Down 1": countTreesEncountered(1, 1),
  "Right 3, Down 1": countTreesEncountered(3, 1),
  "Right 5, Down 1": countTreesEncountered(5, 1),
  "Right 7, Down 1": countTreesEncountered(7, 1),
  "Right 1, Down 2": countTreesEncountered(1, 2),
}

let totalNumberOfTrees = 1;

Object.keys(result).forEach(input => {
  const treesEncountered = result[input];
  console.log(`Number of trees encountered [${input}]: ${treesEncountered}`);
  totalNumberOfTrees *= treesEncountered;
});

console.log(`Number of trees [Multiplied]: ${totalNumberOfTrees}`);

