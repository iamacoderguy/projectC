import { RootState } from './reducer';
import { Dispatch } from 'redux';
import { signInRequest } from './actions';

export const mapStateToProps = (state: RootState) => ({
  token: state.token,
});

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAuthenticating: (username: string, password: string) => dispatch(signInRequest({ username, password })),
});