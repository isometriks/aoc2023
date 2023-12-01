const fs = require('fs');
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'))
  .toString()
  .split('\n');

const p1 = input.reduce((acc, line) => {
  const matches = Array.from(line.matchAll(/\d/g), x => x[0])

  if (matches.length === 0) {
    return acc;
  }

  return acc + parseInt(matches.at(0) + matches.at(-1), 10)
}, 0)

const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const regex = new RegExp(`(?<=(\\d|${numbers.join("|")}))`, "g");

const translate = input => {
  const index = numbers.indexOf(input);
  return index > -1 ? index.toString() : input;
};

const p2 = input.reduce((acc, line) => {
  const matches = Array.from(line.matchAll(regex), x => x[1]);

  if (matches.length === 0) {
    return acc;
  }

  return acc + parseInt(
    translate(matches.at(0)) + translate(matches.at(-1)),
    10
  )
}, 0)

console.log(p1);
console.log(p2);
