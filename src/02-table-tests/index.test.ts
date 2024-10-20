// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 5, b: 3, action: Action.Add, expected: 8 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 4, action: Action.Subtract, expected: 6 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 5, b: 4, action: Action.Multiply, expected: 20 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 5, b: 3, action: 'InvalidAction', expected: null },
  { a: 'invalidArgument', b: 3, action: Action.Add, expected: null },
  { a: 5, b: 'invalidArgument', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    "should return $expected when a = $a, b = $b, and action = '$action'",
    ({ expected, ...testCase }) => {
      expect(simpleCalculator(testCase)).toBe(expected);
    },
  );
});
