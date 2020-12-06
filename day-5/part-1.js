const fs = require('fs');

const boardingPasses = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');
const numRows = 128;
const numCols = 8;

let maxSeatId = 0;

boardingPasses.forEach(boardingPass => {
  const chars = boardingPass.split('');

  let minRow = 0;
  let maxRow = numRows - 1;
  let minCol = 0;
  let maxCol = numCols - 1;

  let index = 0;
  while(index < chars.length) {
    const char = chars[index];
    const diffRow = (maxRow - minRow) * 0.5;
    const diffCol = (maxCol - minCol) * 0.5;

    if (char === 'F') {
      maxRow = Math.floor(maxRow - diffRow);
    } else if (char === 'B') {
      minRow = Math.ceil(minRow + diffRow);
    } else if (char === 'R') {
      minCol = Math.ceil(minCol + diffCol);
    } else if (char === 'L') {
      maxCol = Math.floor(maxCol - diffCol);
    }

    index++;
  }

  const row = Math.min(minRow, maxRow);
  const col = Math.min(minCol, maxCol);
  const seatId = row * 8 + col;

  maxSeatId = Math.max(maxSeatId, seatId);
});

console.log(`Max Seat ID: ${maxSeatId}`);