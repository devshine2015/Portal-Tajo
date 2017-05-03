import React from 'react';
import pure from 'recompose/pure';

import AlertsSection from './AlertsSection';
import OdoForm from './OdoForm';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

const AlertsOdo = () => (
  <AlertsSection
    renderForm={(options) => (<OdoForm {...options} />)}
    myAlertKind={alertKinds._ALERT_KIND_ODO}
    actionButtonLabel={"ADD ALERT"}
    headerLabel={"DISTANCE ALERTS"}
  />
);

export default pure(AlertsOdo);
