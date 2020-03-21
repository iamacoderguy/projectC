import { RootState } from './reducer';
import { Dispatch } from 'redux';
import { signInRequest } from './actions';
import { AuthenticationStackPropsForMapState, AuthenticationStackPropsForMapDispatch } from './AuthenticationStack';

export function mapStateToProps(state: RootState): AuthenticationStackPropsForMapState {
  return {
    token: state.token,
  };
}

export function mapDispatchToProps(dispatch: Dispatch): AuthenticationStackPropsForMapDispatch { 
  return {
    onAuthenticating: (username: string, password: string) => dispatch(signInRequest({ username, password })),
  };
}