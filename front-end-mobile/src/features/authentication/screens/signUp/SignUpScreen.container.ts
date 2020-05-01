import { navigate } from 'lib/utils/navigation';
import navigationMap from '../../navigationMap';

export const navigateToSignInScreen = () => {
  navigate(navigationMap.SignIn);
};