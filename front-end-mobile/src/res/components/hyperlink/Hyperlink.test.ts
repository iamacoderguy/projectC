import { convertToReactNativeHyperlink, generateLinkTexts } from './Hyperlink.container';

it.each([
  [
    'By clicking any of the Sign Up buttons, I agree to the <_terms of service_> and the <_privacy policy_>',
    ['https://policies.google.com/terms?hl=en-US', 'https://en.wikipedia.org/wiki/Hyperlink'],
    'By clicking any of the Sign Up buttons, I agree to the https://policies.google.com/terms?hl=en-US and the https://en.wikipedia.org/wiki/Hyperlink',
  ],
])('convertToReactNativeHyperlink(%s, %o) => %s', (hypertext: string, links: string[], expected: string) => {
  const actual = convertToReactNativeHyperlink(hypertext, links);
  expect(actual).toBe(expected);
});

test('returned function of generateLinkTexts should work', () => {
  // arrange
  const hypertext = 'By clicking any of the Sign Up buttons, I agree to the <_terms of service_> and the <_privacy policy_>';
  const links = ['https://policies.google.com/terms?hl=en-US', 'https://en.wikipedia.org/wiki/Hyperlink'];
  const returnedFunction = generateLinkTexts(hypertext, links);
  const expectedTextForURL1 = 'terms of service';
  const expectedTextForURL2 = 'privacy policy';

  // act
  const actualTextForURL1 = returnedFunction(links[0]);
  const actualTextForURL2 = returnedFunction(links[1]);

  // assert
  expect(actualTextForURL1).toBe(expectedTextForURL1);
  expect(actualTextForURL2).toBe(expectedTextForURL2);
});