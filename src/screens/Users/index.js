import React from 'react';
import pure from 'recompose/pure';
import UsersManager from 'containers/UsersManager';
import InnerPortal from 'containers/InnerPortal';

const UsersManagerScreen = () => (
  <InnerPortal>
    <UsersManager />
  </InnerPortal>
);

export default pure(UsersManagerScreen);
