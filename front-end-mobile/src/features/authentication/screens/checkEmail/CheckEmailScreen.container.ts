import { Dispatch } from 'redux';
import { 
  goToForgotPassword, checkEmailDone,
} from '../../redux/actions';
import { RootState } from '../../types/rootState';

export type CheckEmailScreenPropsForMapState = {
  selectedForm?: number;
  username?: string;
}

export function mapStateToProps(state: RootState): CheckEmailScreenPropsForMapState {
  return {
    selectedForm: state.forgotPasswordForm,
    username: state.forgotPasswordUsername,
  };
}

export type CheckEmailScreenPropsForMapDispatch = {
  onDone: () => void;
  onGoToForgotPasswordScreen: () => void;
}

export function mapDispatchToProps(dispatch: Dispatch): CheckEmailScreenPropsForMapDispatch {
  return {
    onGoToForgotPasswordScreen: () => dispatch(goToForgotPassword()),
    onDone: () => dispatch(checkEmailDone()),
  };
}