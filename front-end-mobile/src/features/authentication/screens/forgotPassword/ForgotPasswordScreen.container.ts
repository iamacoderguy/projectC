import { Dispatch } from 'redux';
import { 
  goToSignIn,
  goToCheckEmail,
} from '../../redux/actions';

export type ForgotPasswordScreenPropsForMapDispatch = {
  onSignInLinkPress: () => void;
  onGoToCheckEmail: (selectedForm: number, username?: string) => void;
}

export function mapDispatchToProps(dispatch: Dispatch): ForgotPasswordScreenPropsForMapDispatch {
  return {
    onSignInLinkPress: () => dispatch(goToSignIn()),
    onGoToCheckEmail: (selectedForm: number, username?: string) => dispatch(goToCheckEmail({ selectedForm, username })),
  };
}