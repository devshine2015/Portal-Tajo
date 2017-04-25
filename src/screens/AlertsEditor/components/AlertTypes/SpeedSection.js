import React from 'react';
import pure from 'recompose/pure';

import AlertsSection from './AlertsSection';
import SpeedForm from './SpeedForm';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

class AlertsSpeed extends React.Component {
  render() {
    return (
      <AlertsSection
        renderForm={(options) => (<SpeedForm {...options} />)}
        myAlertKind={alertKinds._ALERT_KIND_SPEEDING}
        actionButtonLabel={"ADD ALERT"}
        headerLabel={"SPEED ALERTS"}
      />
    );
  }
}

// AlertsSpeed.propTypes = {
// };

export default pure(AlertsSpeed);
