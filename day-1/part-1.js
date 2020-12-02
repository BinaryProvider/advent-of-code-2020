const fs = require('fs');

const expenses = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n').map(val => Number(val));

const findExpenseSum = (input, targetSum) => {
	let indexes = {};

  for (let i = 0; i < input.length; i++) {
		let thisNum = input[i];
		indexes[thisNum] = i;
  }

	for (var i = 0; i < input.length; i++) {
		let diff = targetSum - input[i];
		if (indexes.hasOwnProperty(diff) && indexes[diff] !== i) {
			return [i, indexes[diff]];
		}
  }
}

const index = findExpenseSum(expenses, 2020)
const expense1 = expenses[index[0]];
const expense2 = expenses[index[1]];
const result = expense1 * expense2;

console.log("Expense 1:", expense1);
console.log("Expense 2:", expense2);
console.log("---------------");
console.log("Result: ", result);
console.log('');
