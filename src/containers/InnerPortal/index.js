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
    case 'scc':
      Portal = require('./components/CustomerPortal').default;
      break;
    case 'dealer':
      Portal = require('./components/DealerPortal').default;
      break;
    case 'demo':
      Portal = require('./components/DemoPortal').default;
      break;
    case 'one':
      Portal = require('./components/OnePortal').default;
      break;
    default:
      Portal = null;
  }

  return <Portal {...props} />;
}
