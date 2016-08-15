import React from 'react';
import pure from 'recompose/pure';
import LoginForm from 'containers/LoginForm';
import PortalsLinks from 'components/PortalsLinks';

const LoginScreenDemo = () => (
  <div>
    <LoginForm />
    <PortalsLinks />
  </div>
);

export default pure(LoginScreenDemo);
