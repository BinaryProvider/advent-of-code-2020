const fs = require('fs');

const myBagColor = "shiny gold";
const rules = fs.readFileSync('input.txt', { encoding: 'utf8' }).split('\n');
const contents = new Map();

const formatBag = (bag) => {
  return bag.replace('.', '').replace(/bag(s)?/, '').replace(/[0-9]/, '').trim()
};

const getAvailableBagColors = (contents, targetBag) => {
  const availableBagColors = [];

  contents.forEach((content, bag) => {
    if (content.has(targetBag)) {
      availableBagColors.push(bag, ...getAvailableBagColors(contents, bag));
    };
  })

  return [...new Set(availableBagColors)];
};

rules.forEach(rule => {
  const data = rule.split('contain');
  const bag = formatBag(data[0]);
  const content = data[1].split(',').map(bag => formatBag(bag)).filter(bag => bag !== 'no other');
  contents.set(bag, new Set(content))
});

const availableBagColors = getAvailableBagColors(contents, myBagColor);

console.log(`Number of available bag colors: ${availableBagColors.length}`);