import { subString } from './string';

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