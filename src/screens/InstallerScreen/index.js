import React from 'react';
import pure from 'recompose/pure';
import Installer from 'containers/Installer';
import InnerPortal from 'containers/InnerPortal';

const InstallerScreen = () => (
  <InnerPortal>
    <Installer />
  </InnerPortal>
);

export default pure(InstallerScreen);
