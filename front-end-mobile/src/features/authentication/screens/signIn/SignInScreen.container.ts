import { Dispatch } from 'redux';
import { authenticated } from '../../redux/actions';
import { RootState } from '../../types/rootState';

export type SignInScreenPropsForMapState = {
  idToken?: string;
}

export function mapStateToProps(state: RootState): SignInScreenPropsForMapState {
  return {
    idToken: state.idToken,
  };
}

export type SignInScreenPropsForMapDispatch = {
  onAuthenticated?: (accessToken: string, idToken: string, refreshToken?: string) => void;
}

export function mapDispatchToProps(dispatch: Dispatch): SignInScreenPropsForMapDispatch {
  return {
    onAuthenticated: (accessToken: string, idToken: string, refreshToken?: string) => dispatch(authenticated({ accessToken, idToken, refreshToken })),
  };
}