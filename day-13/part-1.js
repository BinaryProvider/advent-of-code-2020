const fs = require('fs');

const data = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');

const firstDeparture = +data[0];
const buses = data[1].split(',').filter(bus => bus !== 'x').map(bus => +bus);

let nextDeparture = firstDeparture;
let nextBus;

while (!nextBus) {
  nextDeparture++;
  nextBus = buses.find(bus => nextDeparture % bus === 0);
}

const result = nextBus * (nextDeparture - firstDeparture);

console.log(`Next bus ID * waiting time: ${result}`);