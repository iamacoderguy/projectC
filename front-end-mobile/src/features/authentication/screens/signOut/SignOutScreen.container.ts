import { RootState } from '../../types/rootState';
import { Dispatch } from 'redux';
import { signOutRequest } from '../../redux/actions';

export type SignOutScreenPropsForMapState = {
  accessToken?: string;
  refreshToken?: string;
}

export function mapStateToProps(state: RootState): SignOutScreenPropsForMapState {
  return {
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  };
}

export type SignOutScreenPropsForMapDispatch = {
  signOut: (sub: string) => void;
}

export function mapDispatchToProps(dispatch: Dispatch): SignOutScreenPropsForMapDispatch {
  return {
    signOut: (sub: string) => dispatch(signOutRequest(sub)),
  };
}