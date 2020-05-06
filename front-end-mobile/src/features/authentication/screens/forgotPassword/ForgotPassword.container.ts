import { Dispatch } from 'redux';
import { goToSignIn } from '../../redux/actions';

export type ForgotPasswordScreenPropsForMapDispatch = {
  onSignInLinkPress: () => void;
}

export function mapDispatchToProps(dispatch: Dispatch): ForgotPasswordScreenPropsForMapDispatch {
  return {
    onSignInLinkPress: () => dispatch(goToSignIn()),
  };
}