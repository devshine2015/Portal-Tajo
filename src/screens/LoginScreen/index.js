import React from 'react';
import pure from 'recompose/pure';
import LoginForm from 'containers/LoginForm';
import PortalsLinks from 'components/PortalsLinks';
import { onProduction } from 'configs';

const LoginScreenDemo = () => (
  <div>
    { !onProduction && <PortalsLinks /> }
    <LoginForm />
  </div>
);

export default pure(LoginScreenDemo);
