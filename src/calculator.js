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
    case '%': case 'mod': case 'remainder':
      return '%';
    case '^': case 'pow': case 'power':
      return '^';
    case 'sqrt': case '√': case 'square-root':
      return 'sqrt';
    default:
      return null;
  }
}

// Returns the remainder of a divided by b.
function modulo(aRaw, bRaw) {
  const a = parseNumber(aRaw);
  const b = parseNumber(bRaw);
  if (b === 0) throw new Error('Modulo by zero');
  return a % b;
}

// Returns base raised to the exponent.
function power(baseRaw, exponentRaw) {
  const base = parseNumber(baseRaw);
  const exp = parseNumber(exponentRaw);
  return Math.pow(base, exp);
}

// Returns the square root of n. Throws on negative input.
function squareRoot(nRaw) {
  const n = parseNumber(nRaw);
  if (n < 0) throw new Error('Square root of negative number');
  return Math.sqrt(n);
}

function calculate(opRaw, aRaw, bRaw) {
  const op = normalizeOp(opRaw);
  if (!op) throw new Error(`Unsupported operation: ${opRaw}`);

  // Unary sqrt operator
  if (op === 'sqrt') {
    const operandRaw = aRaw !== undefined ? aRaw : bRaw;
    if (operandRaw === undefined) throw new Error('Missing operand for square root');
    return squareRoot(operandRaw);
  }

  const a = parseNumber(aRaw);
  const b = parseNumber(bRaw);

  if ((op === '/' || op === '%') && b === 0) {
    if (op === '/') throw new Error('Division by zero');
    if (op === '%') throw new Error('Modulo by zero');
  }

  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    case '%': return modulo(a, b);
    case '^': return power(a, b);
    default: throw new Error('Unknown operation');
  }
}

module.exports = { calculate, modulo, power, squareRoot };
