// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const resultList = {
      value: 5,
      next: {
        value: 3,
        next: {
          value: 2,
          next: { value: 'end', next: { value: null, next: null } },
        },
      },
    };

    expect(generateLinkedList([5, 3, 2, 'end'])).toStrictEqual(resultList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([13, 11, 7, 'end'])).toMatchSnapshot();
  });
});
