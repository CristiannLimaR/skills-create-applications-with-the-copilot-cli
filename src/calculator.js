// Supported operations:
// - addition: +, add, plus
// - subtraction: -, sub, minus
// - multiplication: *, x, mul, multiply
// - division: /, div, divide

// Exports a single calculate(op, a, b) function used by the CLI.
// The function accepts common operator symbols and names and returns a numeric result.

function parseNumber(value) {
  const n = Number(value);
  if (Number.isNaN(n)) throw new Error(`Invalid number: ${value}`);
  return n;
}

function normalizeOp(op) {
  if (typeof op !== 'string') op = String(op);
  const o = op.trim().toLowerCase();
  switch (o) {
    case '+': case 'add': case 'plus':
      return '+';
    case '-': case 'sub': case 'minus':
      return '-';
    case '*': case 'x': case '\u00d7': case 'mul': case 'multiply':
      return '*';
    case '/': case '\u00f7': case 'div': case 'divide':
      return '/';
    default:
      return null;
  }
}

function calculate(opRaw, aRaw, bRaw) {
  const op = normalizeOp(opRaw);
  if (!op) throw new Error(`Unsupported operation: ${opRaw}`);
  const a = parseNumber(aRaw);
  const b = parseNumber(bRaw);
  if (op === '/' && b === 0) throw new Error('Division by zero');
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    default: throw new Error('Unknown operation');
  }
}

module.exports = { calculate };
