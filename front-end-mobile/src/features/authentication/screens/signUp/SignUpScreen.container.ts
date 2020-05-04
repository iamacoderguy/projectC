import { Dispatch } from 'redux';
import { authenticated } from '../../redux/actions';
import { Credentials } from 'shared/types/credentials';

export type SignUpScreenPropsForMapDispatch = {
  onAuthenticated?: (credentials: Credentials) => void;
}

export function mapDispatchToProps(dispatch: Dispatch): SignUpScreenPropsForMapDispatch {
  return {
    onAuthenticated: (credentials: Credentials) => dispatch(authenticated(credentials)),
  };
}