import React from 'react';
import pure from 'recompose/pure';
import VehiclesEditor from 'containers/VehiclesEditor';
import InnerPortal from 'containers/InnerPortal';

const VehiclesManagerScreen = () => (
  <InnerPortal>
    <VehiclesEditor />
  </InnerPortal>
);

export default pure(VehiclesManagerScreen);
