const { calculate } = require('../calculator');

describe('Calculator - basic arithmetic', () => {
  test('addition using symbol', () => {
    expect(calculate('+', 2, 3)).toBe(5);
  });

  test('addition using name', () => {
    expect(calculate('add', '10', '5')).toBe(15);
  });

  test('subtraction using symbol', () => {
    expect(calculate('-', 10, 4)).toBe(6);
  });

  test('subtraction using name', () => {
    expect(calculate('sub', '7', '2')).toBe(5);
  });

  test('multiplication using symbol', () => {
    expect(calculate('*', 45, 2)).toBe(90);
  });

  test('multiplication using name/x', () => {
    expect(calculate('x', '3', 3)).toBe(9);
    expect(calculate('mul', 4, '2')).toBe(8);
  });

  test('division using symbol and name', () => {
    expect(calculate('/', 20, 5)).toBe(4);
    expect(calculate('div', '9', '3')).toBe(3);
  });

  test('float and negative numbers', () => {
    expect(calculate('+', 2.5, 1.25)).toBeCloseTo(3.75);
    expect(calculate('*', -3, 4)).toBe(-12);
  });

  test('division by zero throws', () => {
    expect(() => calculate('/', 5, 0)).toThrow('Division by zero');
  });

  test('invalid number throws', () => {
    expect(() => calculate('+', 'a', 3)).toThrow('Invalid number');
  });

  test('unsupported operation throws', () => {
    expect(() => calculate('pow', 2, 3)).toThrow('Unsupported operation');
  });
});
