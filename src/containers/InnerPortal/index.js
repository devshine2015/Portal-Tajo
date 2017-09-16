import React from 'react';
import { project } from 'configs';
import CustomerPortal from './components/Main/ConnectedCustomer';
import DealerPortal from './components/Main/DealerPortal';

export default function createInnerPortal(props) {
  switch (project) {
    case 'portal':
    case 'tajo':
      return <CustomerPortal {...props} />;

    case 'dealer':
      return <DealerPortal {...props} />;

    default:
      return null;
  }
}
