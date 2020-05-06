import { Dispatch } from 'redux';
import { 
  authenticated,
  goToSignIn,
} from '../../redux/actions';
import { Credentials } from 'shared/types/credentials';

export type SignUpScreenPropsForMapDispatch = {
  onAuthenticated: (credentials: Credentials) => void;
  onSignInLinkPress: () => void;
}

export function mapDispatchToProps(dispatch: Dispatch): SignUpScreenPropsForMapDispatch {
  return {
    onAuthenticated: (credentials: Credentials) => dispatch(authenticated(credentials)),
    onSignInLinkPress: () => dispatch(goToSignIn()),
  };
}