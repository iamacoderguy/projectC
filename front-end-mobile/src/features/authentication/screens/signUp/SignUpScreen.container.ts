import { Dispatch } from 'redux';
import { authenticated } from '../../redux/actions';

export type SignUpScreenPropsForMapDispatch = {
  onAuthenticated?: (accessToken: string, idToken: string, refreshToken?: string) => void;
}

export function mapDispatchToProps(dispatch: Dispatch): SignUpScreenPropsForMapDispatch {
  return {
    onAuthenticated: (accessToken: string, idToken: string, refreshToken?: string) => dispatch(authenticated({ accessToken, idToken, refreshToken })),
  };
}