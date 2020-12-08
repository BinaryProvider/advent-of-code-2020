const fs = require('fs');

const originalInstructions = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n').map(bootCode => {
  const data = bootCode.match(/(?<instruction>.*) (?<argument>[+|-][0-9]+)/);
  return {
    instruction: data.groups.instruction,
    argument: +data.groups.argument
  }
})

const run = (instructions) => {
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

  while (index < instructions.length) {
    if (memory.has(index)) break;
    memory.add(index);
  
    const bootCode = instructions[index];
    operations[bootCode.instruction](bootCode.argument);
  }

  return {
    index,
    accumulator
  };
}

let changeIndex = 0;
let result = { index: 0, accumulator: 0 }

while (result.index < originalInstructions.length && changeIndex < originalInstructions.length) {
  const modifiedInstructions = JSON.parse(JSON.stringify(originalInstructions));
  const changeInstruction = modifiedInstructions[changeIndex];

  if (changeInstruction.instruction === 'jmp' || changeInstruction.instruction === 'nop') {
    changeInstruction.instruction = changeInstruction.instruction === 'jmp' ? 'nop' : 'jmp';
  }

  result = run(modifiedInstructions);

  changeIndex++;
}

console.log(`Value of accumulator: ${result.accumulator}`);