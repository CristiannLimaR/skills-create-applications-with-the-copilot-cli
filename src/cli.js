#!/usr/bin/env node

const { calculate } = require('./calculator');

const usage = `Usage:
  calculator <a> <op> <b>
  calculator <op> <a> <b>
Examples:
  calculator 3 + 4
  calculator add 5 6
Supported operations: +, -, *, /  (also: add, sub, mul, div)
`;

const args = process.argv.slice(2);
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(usage);
  process.exit(0);
}

let op, a, b;

if (args.length === 3) {
  // Try to detect form: either "a op b" or "op a b"
  const firstIsNumber = !Number.isNaN(Number(args[0]));
  const secondIsNumber = !Number.isNaN(Number(args[1]));
  const thirdIsNumber = !Number.isNaN(Number(args[2]));

  if (!firstIsNumber && secondIsNumber && thirdIsNumber) {
    // op a b
    op = args[0]; a = args[1]; b = args[2];
  } else if (firstIsNumber && !secondIsNumber && thirdIsNumber) {
    // a op b
    a = args[0]; op = args[1]; b = args[2];
  } else {
    // ambiguous — default to a op b
    a = args[0]; op = args[1]; b = args[2];
  }
} else {
  console.error('Invalid arguments.');
  console.error(usage);
  process.exit(2);
}

try {
  const result = calculate(op, a, b);
  if (Number.isFinite(result)) {
    console.log(result);
    process.exit(0);
  }
  console.error('Result is not a finite number');
  process.exit(3);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
