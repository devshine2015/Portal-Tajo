import React from 'react';
import pure from 'recompose/pure';

import AlertsSection from './AlertsSection';
import TimeForm from './TimeForm';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

const AlertsDriveTime = () => (
      <AlertsSection
        renderForm={(options) => (<TimeForm {...options} />)}
        myAlertKind={alertKinds._ALERT_KIND_DRIVE_TIME}
        actionButtonLabel={"ADD ALERT"}
        headerLabel={"DRIVE TIME ALERTS"}
      />
);

export default pure(AlertsDriveTime);
