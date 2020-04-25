import { findNextIndex, clean } from './array';

describe(`${findNextIndex.name}`, () => {
  it.each([
    [['string1', 'string2', 'string3'], 'string1', 1],
    [['string1', 'string2', 'string3'], 'string2', 2],
    [['string1', 'string2', 'string3'], 'string3', -1],
    [['string1', 'string2', 'string3'], 'blah blah', -1],
  ])('array=%s, current=%s, expectedNext=%s', (array: string[], current: string, expected: number) => {
    // arrange
    const currentPredicate = (str: string) => str === current;
    
    // act
    const actual = findNextIndex(array, currentPredicate);

    // assert
    expect(actual).toEqual(expected);
  });
});

describe(`${clean.name}`, () => {
  it('should clean the array', () => {
    // arrange
    const array = [1, 2, 3, 4];

    // act
    clean(array);

    // assert
    expect(array).toStrictEqual([]);
  });

  it.todo('check memory to see if it is a real cleanup');
});