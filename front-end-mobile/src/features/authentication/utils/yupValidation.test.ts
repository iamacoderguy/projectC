import { usernameValidation, passwordValidation } from './yupValidation';

describe(`${usernameValidation.name}`, () => {
  it.each([
    [undefined],
    [''],
    ['%'],
    ['1234564'],
  ])('should throw errors in case %s', (input) => {
    // arrange
    const yupSchema = usernameValidation('username');

    // act & arrange
    expect(() => {
      yupSchema.validateSync(input);
    }).toThrow();
  });

  it.each([
    ['abcdef'],
    ['@^$.!`-#+\'~_'],
  ])('should pass in case %s', (input) => {
    // arrange
    const yupSchema = usernameValidation('username');

    // act & arrange
    expect(() => {
      yupSchema.validateSync(input);
    }).not.toThrow();
  });
});

describe(`${passwordValidation.name}`, () => {
  it.each([
    [undefined],
    [''],
    ['123'],
    ['abcdef9'],
  ])('should throw errors in case %s', (input) => {
    // arrange
    const yupSchema = passwordValidation('password');

    // act & arrange
    expect(() => {
      yupSchema.validateSync(input);
    }).toThrow();
  });

  it.each([
    ['12345678'],
    ['passwordContainsAtLeast8Characters'],
    ['p@ssw0rd'],
  ])('should pass in case %s', (input) => {
    // arrange
    const yupSchema = passwordValidation('password');

    // act & arrange
    expect(() => {
      yupSchema.validateSync(input);
    }).not.toThrow();
  });
});