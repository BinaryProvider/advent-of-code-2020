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

let shipX = 0;
let shipY = 0;

let waypointX = -10;
let waypointY = -1;

const moveToWaypoint = (units) => {
  const moveX = (waypointX - shipX) * units;
  const moveY = (waypointY - shipY) * units;
  shipX += moveX;
  shipY += moveY;
  waypointX += moveX;
  waypointY += moveY;
}

const rotateWaypoint = (direction, units) => {
  const angle = (direction === compass.Right ? units * -1 : units) * (Math.PI / 180);

  let rotatedX = ((waypointX - shipX) * Math.cos(angle) - (waypointY - shipY) * Math.sin(angle)) + shipX;
  let rotatedY = ((waypointX - shipX) * Math.sin(angle) + (waypointY - shipY) * Math.cos(angle)) + shipY;

  waypointX = +rotatedX.toFixed(0);
  waypointY = +rotatedY.toFixed(0);
}

const moveShip = (direction, units) => {
  switch (direction) {
    case compass.North:
      waypointY -= units;
      break;
    case compass.South:
      waypointY += units;
      break;
    case compass.East:
      waypointX -= units;
      break;
    case compass.West:
      waypointX += units;
      break;
    case compass.Forward:
      moveToWaypoint(units);
      break;
    case compass.Left:
      rotateWaypoint(compass.Left, units);
      break;
    case compass.Right:
      rotateWaypoint(compass.Right, units);
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

console.log(`Manhattan distance: ${Math.abs(shipX) + Math.abs(shipY)}`);