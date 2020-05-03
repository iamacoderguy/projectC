import { Dispatch } from 'redux';
import { authenticated } from '../../redux/actions';

export type SignInScreenPropsForMapDispatch = {
  onAuthenticated?: (accessToken: string, refreshToken?: string) => void;
}

export function mapDispatchToProps(dispatch: Dispatch): SignInScreenPropsForMapDispatch {
  return {
    onAuthenticated: (accessToken: string, refreshToken?: string) => dispatch(authenticated({ accessToken, refreshToken })),
  };
}