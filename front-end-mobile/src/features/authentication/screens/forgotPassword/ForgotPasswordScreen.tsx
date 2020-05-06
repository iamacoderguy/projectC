import React from 'react';
import Layout from '../../components/layout/Layout';
import R from 'shared/res/R';

const strings = {
  forgotPassword: R.strings.authentication.forgotPassword,
  shared: R.strings.authentication.shared,
};

const ForgotPasswordScreen = () => {

  return (
    <Layout
      title={strings.forgotPassword.title()}
    >
    </Layout>
  );
};

export default ForgotPasswordScreen;