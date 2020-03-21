import { Dispatch } from 'redux';
import { localizer } from 'features/localization';
import { changeLanguageSuccess } from './actions';
import { RootState } from './reducer';

// === mapStateToProps ===
export const mapStateToProps = (state: RootState) => ({
  lng: state.lng,
});

// === mapDispatchToProps ===
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLanguageChanged: (lng: string) => handleLanguageChanged(dispatch, lng),
});

const handleLanguageChanged = async (dispatch: Dispatch, lng: string) => {
  await localizer.changeLanguage(lng);
  dispatch(changeLanguageSuccess({lng}));
};