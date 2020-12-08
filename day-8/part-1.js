const fs = require('fs');

const instructions = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n').map(bootCode => {
  const data = bootCode.match(/(?<instruction>.*) (?<argument>[+|-][0-9]+)/);
  return {
    instruction: data.groups.instruction,
    argument: +data.groups.argument
  }
})

const memory = new Set();

let index = 0;
let accumulator = 0;

const operations = {
  acc: (arg) => {
    accumulator += arg;
    index++;
  },
  jmp: (arg) => {
    index += arg;
  },
  nop: (arg) => {
    index++;
  }
}

while (true) {
  if (memory.has(index)) break;
  memory.add(index);

  const instruction = instructions[index];
  operations[instruction.instruction](instruction.argument);
}

console.log(`Value of accumulator: ${accumulator}`);