const fs = require('fs');

const expenses = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n').map(val => Number(val));

const findExpenseSum = function(input, targetSum) {
  const lookup = {};

  for (let i = 0; i < input.length; i++) {
    lookup[input[i]] = i
  }

  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      let val = targetSum - (input[i] + input[j]);
      if (lookup[val]) {
        if (val != i && val != j) {
          return [i, j, lookup[val]];
        }
      }
    }
  }

  return [];
};

const index = findExpenseSum(expenses, 2020)
const expense1 = expenses[index[0]];
const expense2 = expenses[index[1]];
const expense3 = expenses[index[2]];
const result = expense1 * expense2 * expense3;

console.log("Expense 1:", expense1);
console.log("Expense 2:", expense2);
console.log("Expense 3:", expense3);
console.log("---------------");
console.log("Result: ", result);
console.log('');
