const fs = require("fs");

const data = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n");
const buses = data[1]
  .split(",")
  .map((bus) => (Number(bus) ? BigInt(bus) : "x"));

const modInverse = (a, m) => {
  let g = gcd(a, m);

  if (g != 1n) {
    console.log("No Inverse");
  } else {
    return power(a, m - 2n, m);
  }
};

const power = (x, y, m) => {
  if (y === 0n) return 1n;

  let p = power(x, y / 2n, m) % m;
  p = (p * p) % m;

  if (y % 2n === 0n) return p;
  else return (x * p) % m;
};

const gcd = (a, b) => {
  if (a === 0n) return b;
  return gcd(b % a, a);
};

const pairs = buses
  .map((elm, i) => {
    if (typeof elm === "bigint") return [elm, BigInt(i)];
  })
  .filter((elm) => elm);

let N = 1n;

pairs.forEach((pair) => (N *= pair[0]));

const Ni = pairs.map((pair) => N / pair[0]);
const b = pairs.map((pair, i) => (i === 0 ? 0n : pair[0] - pair[1]));
const x = pairs.map((item, i) => modInverse(Ni[i], item[0]));
const bnx = Ni.map((item, i) => item * b[i] * x[i]);
const sum = bnx.reduce((acc, cur) => acc + cur);

const firstDepartureTime = Number(sum - (sum / N) * N);

console.log(`First departure time: ${firstDepartureTime}`);
