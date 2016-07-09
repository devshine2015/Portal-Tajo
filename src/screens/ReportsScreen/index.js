import React from 'react';
import pure from 'recompose/pure';
import PortalReports from 'containers/Report';
import InnerPortal from 'containers/InnerPortal';

const ReportsScreen = () => (
  <InnerPortal>
    <PortalReports />
  </InnerPortal>
);

export default pure(ReportsScreen);
