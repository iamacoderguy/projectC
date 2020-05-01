import { navigate } from 'lib/utils/navigation';
import navigationMap from 'features/authentication/navigationMap';

export const handleOnSignInButtonPress = (onSignIn: (username: string, password: string) => void) => {
  onSignIn('fake_username', 'fake_password');
};

export const navigateToSignUpScreen = () => {
  navigate(navigationMap.SignUp);
};