import React from 'react';
import pure from 'recompose/pure';

import AlertsSection from './AlertsSection';
import TempForm from './TempForm';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

const AlertsTemp = () => (
  <AlertsSection
    renderForm={(options) => (<TempForm {...options} />)}
    myAlertKind={alertKinds._ALERT_KIND_TEMPERATURE}
    actionButtonLabel={"ADD ALERT"}
    headerLabel={"TEMPERATURE ALERTS"}
  />
);

export default pure(AlertsTemp);
