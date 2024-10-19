// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 5, b: 3, action: Action.Add };

    expect(simpleCalculator(input)).toBe(8);
  });

  test('should subtract two numbers', () => {
    const input = { a: 10, b: 4, action: Action.Subtract };

    expect(simpleCalculator(input)).toBe(6);
  });

  test('should multiply two numbers', () => {
    const input = { a: 5, b: 3, action: Action.Multiply };

    expect(simpleCalculator(input)).toBe(15);
  });

  test('should divide two numbers', () => {
    const input1 = { a: 10, b: 2, action: Action.Divide };
    const input2 = { a: 10, b: 0, action: Action.Divide };

    expect(simpleCalculator(input1)).toBe(5);
    expect(simpleCalculator(input2)).toBe(Infinity);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };

    expect(simpleCalculator(input)).toBe(8);
  });

  test('should return null for invalid action', () => {
    const input = { a: 5, b: 3, action: 'InvalidAction' };

    expect(simpleCalculator(input)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 'abc', b: 'def', action: Action.Add };

    expect(simpleCalculator(input)).toBeNull();
  });
});
