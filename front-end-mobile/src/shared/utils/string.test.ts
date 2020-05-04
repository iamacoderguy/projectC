import { subString, contain } from './string';

describe(`${subString.name}`, () => {
  it.each([
    [
      'By clicking any of the Sign Up buttons, I agree to the <_terms of service_> and the <_privacy policy_>',
      '<_', '_>',
      ['terms of service', 'privacy policy'],
    ],
  ])('subString(%s, %s, %s) => %o', (oriString, startWith, endWith, expected) => {
    const actual = subString(oriString, startWith, endWith);
    expect(actual).toStrictEqual(expected);
  });
});

describe(`${contain.name}`, () => {
  it.each([
    ['github|53971138', ['github', 'google-oauth2'], true],
    ['google-oauth2|116450110299387581805', ['github', 'google-oauth2'], true],
    ['auth0|5ead49e5d3c54e0bec8edacb', ['github', 'google-oauth2'], false],
  ])('contain(%s, %o) => %s ', (str, args, expected) => {
    // action
    const actual = contain(str, ...args);

    // assert
    expect(actual).toEqual(expected);
  });
});