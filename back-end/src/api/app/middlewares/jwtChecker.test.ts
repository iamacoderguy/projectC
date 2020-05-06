import { URL } from 'url';

it.each([
  ['https://dev-projectaz.au.auth0.com', '.well-known/jwks.json', 'https://dev-projectaz.au.auth0.com/.well-known/jwks.json'],
  ['https://dev-projectaz.au.auth0.com/', '.well-known/jwks.json', 'https://dev-projectaz.au.auth0.com/.well-known/jwks.json'],
  ['https://dev-projectaz.au.auth0.com', '/.well-known/jwks.json', 'https://dev-projectaz.au.auth0.com/.well-known/jwks.json'],
  ['https://dev-projectaz.au.auth0.com', '.well-known/jwks.json/', 'https://dev-projectaz.au.auth0.com/.well-known/jwks.json/'],
  ['https://dev-projectaz.au.auth0.com/', '/.well-known/jwks.json/', 'https://dev-projectaz.au.auth0.com/.well-known/jwks.json/'],
])('%s + %s should return %s', (base, url, expected) => {
  // act
  const actual = new URL(url, base);

  // assert
  expect(actual.href).toEqual(expected);
});
