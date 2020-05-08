import { Dispatch } from 'redux';
import { localizer } from 'features/localization';
import { 
  changeLanguageSuccess,
  installLocalizationRequest,
  uninstallLocalizationRequest,
} from '../../redux/actions';
import { RootState } from '../../types/rootState';
import { InAppTabsPropsForMapState, InAppTabsPropsForMapDispatch } from './InAppTabs';

// === mapStateToProps ===
export function mapStateToProps(state: RootState): InAppTabsPropsForMapState {
  return {
    lng: state.lng,
    isLocalizationInstalled: state.isLocalizationInstalled,
  };
}

// === mapDispatchToProps ===
export function mapDispatchToProps(dispatch: Dispatch): InAppTabsPropsForMapDispatch {
  return {
    onLanguageChangeTriggered: (lng: string) => handleLanguageChangeTrigger(dispatch, lng),
    onLocalizationInstallationTriggered: () => dispatch(installLocalizationRequest()),
    onLocalizationUninstallationTriggered: () => dispatch(uninstallLocalizationRequest()),
  };
}

const handleLanguageChangeTrigger = async (dispatch: Dispatch, lng: string) => {
  await localizer.changeLanguage(lng);
  dispatch(changeLanguageSuccess({lng}));
};