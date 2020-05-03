jest.mock('react-native-keychain', () => {
  return {
    setGenericPassword: jest.fn().mockResolvedValue({}),
    getGenericPassword: jest.fn().mockResolvedValue({}),
  };
});

import { stringify, parse } from './storage';

describe(`${stringify.name}`, () => {
  it('should convert a Map<string, string> to a string', () => {
    // arrange
    const credentialsAsMap = new Map<string, string>();
    const refreshToken = 'v1.MWHcJ8scmPD1cC1ZZwywhp39HPUPHbGCaDlgtxJIeTY3vOAtkCJvpwWkVJ4n-e9UcZOBEAV1X6_9l_oj3ERwYYg';
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qUTROVVF4UVRBMFJVWkdNRVEyTmtVNVJURkZNakUzT1RGQk1FTkdNamsxTmtNd05qbEZRUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1wcm9qZWN0YXouYXUuYXV0aDAuY29tLyIsInN1YiI6ImdpdGh1Ynw1Mzk3MTEzOCIsImF1ZCI6WyJodHRwczovL2FwaS5pYW1hY29kZXJndXkubWUvYnV6eiIsImh0dHBzOi8vZGV2LXByb2plY3Rhei5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTg4NDkyMjExLCJleHAiOjE1ODg0OTk0MTEsImF6cCI6IkdoVXdwSkFuRHZoZUZGelg0aktoV1FQaFVaWWpLSWwwIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyIsInBlcm1pc3Npb25zIjpbInJlYWQ6aGVsbG9Xb3JsZCJdfQ.TSem3KAvXXM8yUYYuz5hTZfmK5tiNcONiR4ZObgR3eky6tE70TlObVA-f6Z-NairzPCF4OBHGE4_bgjl3W4QdyvDIgwWqXUT-5D2XDVBRPeg6sPBvsWc6WNT9W7xSg7ckcCfKK3Wdi5apU59y0iI3DBYj5MzUb8r52WtM-_F_yZvUlGrW7Zg_YBLT5mpVLWaEFB0QJI4Q0MwZzBk12FnYcpBcLUN4bwnBmBmReJyBi6HxLTc-kfbLwenWla-kc3TGmHWLePPxCHOEY2KqUEMuC6TAIIC3408z1exkoarRozz3fisvY9xvUFYyZ8DQXxOSWDLskV7i_V7eznam0M02A';
    credentialsAsMap.set('refreshToken', refreshToken);
    credentialsAsMap.set('accessToken', accessToken);

    // act
    const actual = stringify(credentialsAsMap);

    // assert
    expect(actual).toContain('refreshToken');
    expect(actual).toContain(refreshToken);
    expect(actual).toContain('accessToken');
    expect(actual).toContain(accessToken);
  });
});

describe(`${parse.name}`, () => {
  it('should convert a valid string to the origin Map', () => {
    // arrange
    const refreshToken = 'v1.MWHcJ8scmPD1cC1ZZwywhp39HPUPHbGCaDlgtxJIeTY3vOAtkCJvpwWkVJ4n-e9UcZOBEAV1X6_9l_oj3ERwYYg';
    const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qUTROVVF4UVRBMFJVWkdNRVEyTmtVNVJURkZNakUzT1RGQk1FTkdNamsxTmtNd05qbEZRUSJ9.eyJpc3MiOiJodHRwczovL2Rldi1wcm9qZWN0YXouYXUuYXV0aDAuY29tLyIsInN1YiI6ImdpdGh1Ynw1Mzk3MTEzOCIsImF1ZCI6WyJodHRwczovL2FwaS5pYW1hY29kZXJndXkubWUvYnV6eiIsImh0dHBzOi8vZGV2LXByb2plY3Rhei5hdS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTg4NDkyMjExLCJleHAiOjE1ODg0OTk0MTEsImF6cCI6IkdoVXdwSkFuRHZoZUZGelg0aktoV1FQaFVaWWpLSWwwIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyIsInBlcm1pc3Npb25zIjpbInJlYWQ6aGVsbG9Xb3JsZCJdfQ.TSem3KAvXXM8yUYYuz5hTZfmK5tiNcONiR4ZObgR3eky6tE70TlObVA-f6Z-NairzPCF4OBHGE4_bgjl3W4QdyvDIgwWqXUT-5D2XDVBRPeg6sPBvsWc6WNT9W7xSg7ckcCfKK3Wdi5apU59y0iI3DBYj5MzUb8r52WtM-_F_yZvUlGrW7Zg_YBLT5mpVLWaEFB0QJI4Q0MwZzBk12FnYcpBcLUN4bwnBmBmReJyBi6HxLTc-kfbLwenWla-kc3TGmHWLePPxCHOEY2KqUEMuC6TAIIC3408z1exkoarRozz3fisvY9xvUFYyZ8DQXxOSWDLskV7i_V7eznam0M02A';
    const credentialsAsString = `[["refreshToken","${refreshToken}"],["accessToken","${accessToken}"]]`;

    // act
    const actual = parse(credentialsAsString);

    // assert
    expect(actual.get('refreshToken')).toEqual(refreshToken);
    expect(actual.get('accessToken')).toEqual(accessToken);
  });

  it('should return an empty Map if the string is null or whitespace', () => {
    // arrange
    const credentialsAsString = '';

    // act
    const actual = parse(credentialsAsString);

    // assert
    expect(actual).toEqual(new Map<string, string>());
  });
});