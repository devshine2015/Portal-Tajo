import React from 'react';
import pure from 'recompose/pure';

import AlertsSection from './AlertsSection';
import SpeedForm from './SpeedForm';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

const AlertsSpeed = () => (
      <AlertsSection
        renderForm={(options) => (<SpeedForm {...options} />)}
        myAlertKind={alertKinds._ALERT_KIND_SPEEDING}
        actionButtonLabel={"ADD SPEED ALERT CONDITION"}
        headerLabel={"SPEED ALERTS"}
      />
);

export default pure(AlertsSpeed);
