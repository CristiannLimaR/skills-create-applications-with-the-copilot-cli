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

  test('power (exponentiation)', () => {
    expect(calculate('pow', 2, 3)).toBe(8);
    expect(calculate('^', '3', '3')).toBe(27);
  });

  test('modulo operation and edge cases', () => {
    expect(calculate('%', 10, 3)).toBe(1);
    expect(calculate('%', 5, 2)).toBe(1); // image example: 5 % 2
    expect(calculate('mod', '10', '4')).toBe(2);
    expect(() => calculate('%', 5, 0)).toThrow('Modulo by zero');
  });

  test('square root and edge cases', () => {
    expect(calculate('sqrt', 9)).toBe(3);
    expect(calculate('sqrt', '2.25')).toBeCloseTo(1.5);
    expect(calculate('sqrt', 16)).toBe(4); // image example: sqrt 16
    expect(() => calculate('sqrt', -4)).toThrow('Square root of negative number');
  });

  test('unsupported operation throws', () => {
    expect(() => calculate('foo', 2, 3)).toThrow('Unsupported operation');
  });
});
