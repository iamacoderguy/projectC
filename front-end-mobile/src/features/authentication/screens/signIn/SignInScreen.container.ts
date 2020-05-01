export const handleOnSignInButtonPress = (onSignIn: (username: string, password: string) => void) => {
  onSignIn('fake_username', 'fake_password');
};