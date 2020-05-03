import { RootState } from '../../types/rootState';

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