const fs = require('fs');

const instructions = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');

const compass = {
  ['North']: 'N',
  ['South']: 'S',
  ['East']: 'E',
  ['West']: 'W',
  ['Left']: 'L',
  ['Right']: 'R',
  ['Forward']: 'F'
};

const directionAngle = {
  [compass.East]: 0,
  [compass.South]: 90,
  [compass.West]: 180,
  [compass.North]: 270,
}

const angleDirection = {
  [0]: compass.East,
  [90]: compass.South,
  [180]: compass.West,
  [270]: compass.North,
}

let x = 0;
let y = 0;
let facing = compass.East;

const turnLeft = (units) => {
  let shipAngle = directionAngle[facing];
  setAngle(shipAngle - units);
}

const turnRight = (units) => {
  let shipAngle = directionAngle[facing];
  setAngle(shipAngle + units);
}

const setAngle = (angle) => {
  if (angle >= 360) {
    angle = (angle - 360);
  } else if (angle < 0) {
    angle = 360 - (angle * -1);
  }
  facing = angleDirection[angle];
}

const moveShip = (direction, units) => {
  switch (direction) {
    case compass.North:
      y -= units;
      break;
    case compass.South:
      y += units;
      break;
    case compass.East:
      x -= units;
      break;
    case compass.West:
      x += units;
      break;
    case compass.Forward:
      moveShip(facing, units);
      break;
    case compass.Left:
      turnLeft(units);
      break;
    case compass.Right:
      turnRight(units);
      break;
    default:
      break;
  }
}

instructions.forEach(instruction => {
  const regex = new RegExp(/(?<direction>.*?)(?<units>[0-9]+)/g);
  const match = regex.exec(instruction);
  const direction = match.groups.direction;
  const units = +match.groups.units;
  moveShip(direction, units);
});

console.log(`Manhattan distance: ${Math.abs(x) + Math.abs(y)}`);