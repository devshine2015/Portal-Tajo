/* internal portal root */
import React from 'react';
import configureStore from 'redux/store';
import { createSelfServiceReducer } from 'redux/reducers';
import { renderProjectWithoutRoutes } from 'projects/baseProject';
import SelfServiceReport from 'containers/SelfServiceReport';

renderProjectWithoutRoutes({
  createReducer: createSelfServiceReducer,
  configureStore,
  anchor: document.getElementById('root') || document.getElementById('app'),
  rootNode: <SelfServiceReport fleet={getFleetNameFromUrl()} />,
});

function getFleetNameFromUrl() {
  const re = new RegExp('/portal/(.*)/.*');
  const matched = window.location.pathname.match(re);

  if (matched && matched.length === 2) {
    return matched[1];
  }

  return 'test';
}
