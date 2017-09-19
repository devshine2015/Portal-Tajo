import React from 'react';
import { project } from 'configs';

/**
 * Lazy load portal for project
 * @param {*} props injected into componnet
 */
export default function createInnerPortal(props) {
  let Portal;

  switch (project) {
    case 'portal':
    case 'tajo':
      Portal = require('./components/Main/ConnectedCustomer').default;
      break;

    case 'dealer':
      Portal = require('./components/Main/DealerPortal').default;
      break;

    default:
      Portal = null;
  }

  return <Portal {...props} />;
}
