const fs = require('fs');

const layout = [];

fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n').forEach(row => {
  const cells = row.split('');
  layout.push(cells);
});

const seatState = { occupied: '#', empty: 'L', floor: '.' }
const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

const getSeat = (grid, y, x) => {
  if (!grid[y] || !grid[y][x]) return;
  return grid[y][x];
}

const setSeat = (y, x, numAdjacentOccupied) => {
  const seat = layout[y][x];

  if (seat === seatState.empty && numAdjacentOccupied === 0) {
    layout[y][x] = seatState.occupied;
    return 1;
  } else if (seat === seatState.occupied && numAdjacentOccupied >= 5) {
    layout[y][x] = seatState.empty;
    return 1;
  }
  return 0;
}

const getAdjacentOccupied = (grid, y, x) => {
  let numOccupied = 0;

  directions.forEach(dir => {
    let traverseY = y + dir[0];
    let traverseX = x + dir[1];

    while (traverseX > -1 && traverseY > -1 && traverseX < grid[0].length && traverseY < grid.length) {
      const seat = getSeat(grid, traverseY, traverseX);

      if (seat === seatState.empty || seat === seatState.occupied) {
        numOccupied += (seat === seatState.occupied) ? 1 : 0;
        break;
      }

      traverseY += dir[0];
      traverseX += dir[1];
    }
  });

  return numOccupied;
}

const applySeatRules = () => {
  let grid = JSON.parse(JSON.stringify(layout));
  let numChangedSeats = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let numAdjacentOccupied = getAdjacentOccupied(grid, y, x);
      numChangedSeats += setSeat(y, x, numAdjacentOccupied);
    }
  }

  return numChangedSeats;
}

const numOccupied = () => {
  let count = 0;

  layout.forEach(row => {
    row.forEach(seat => {
      count += seat === seatState.occupied ? 1 : 0;
    })
  })

  return count;
}

while (true) {
  let numChangedSeats = applySeatRules();
  if (numChangedSeats === 0) break;
}

console.log(`Number of occupied seats: ${numOccupied()}`);