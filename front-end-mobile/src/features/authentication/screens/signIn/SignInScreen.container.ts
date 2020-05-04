import { Dispatch } from 'redux';
import { authenticated } from '../../redux/actions';
import { RootState } from '../../types/rootState';
import { Credentials } from 'shared/types/credentials';

export type SignInScreenPropsForMapState = {
  idToken?: string;
}

export function mapStateToProps(state: RootState): SignInScreenPropsForMapState {
  return {
    idToken: state.idToken,
  };
}

export type SignInScreenPropsForMapDispatch = {
  onAuthenticated?: (credentials: Credentials) => void;
}

export function mapDispatchToProps(dispatch: Dispatch): SignInScreenPropsForMapDispatch {
  return {
    onAuthenticated: (credentials: Credentials) => dispatch(authenticated(credentials)),
  };
}