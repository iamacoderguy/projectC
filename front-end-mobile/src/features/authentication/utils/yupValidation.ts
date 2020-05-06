import * as Yup from 'yup';
import R from 'shared/res/R';

const strings = R.strings.authentication.shared;

export const usernameValidation = (placeholder: string) => Yup.string()
  .max(15, strings.validationMessageMaxLength(placeholder, 15))
  .matches(/^[a-zA-Z@^$.!`\-#+'~_]+$/, strings.validationMessageCharactersAllowed(placeholder, '@^$.!`-#+\'~_'))
  .required(strings.validationMessageRequired(placeholder));

export const passwordValidation = (placeholder: string) => Yup.string()
  .min(8, strings.validationMessageMinLength(placeholder, 8))
  .required(strings.validationMessageRequired(placeholder));

export const emailValidation = (placeholder: string) => Yup.string()
  .email(strings.validationMessageEmail(placeholder))
  .required(strings.validationMessageRequired(placeholder));