const fs = require('fs');

const myBagColor = "shiny gold";
const rules = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');
const contents = new Map();

const formatBag = (bag) => {
  const match = bag.match(/[0-9]/);
  const numBags = match ? match[0] : 0;
  const bagColor = bag.replace('.', '').replace(/bag(s)?/, '').replace(/[0-9]/, '').trim();
  return {
    num: numBags,
    color: bagColor
  }
};

rules.forEach(rule => {
  const data = rule.split('contain');
  const bag = formatBag(data[0]);
  const content = data[1].split(',').map(bag => formatBag(bag));
  contents.set(bag.color, content)
});

const countBags = (bagColor) => {
  const bags = contents.get(bagColor)
  const count = bags ? bags.reduce((num, bag) => (num + (+bag.num || 0)) + countBags(bag.color) * bag.num, 0) : 0;
  return count;
};

const numBags = countBags(myBagColor);

console.log(`Number of individual bags required: ${numBags}`);
