import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import AlertsSection from './../AlertsSection/AlertsSection';
import SpeedAlert from './SpeedAlert';
import SpeedForm from './SpeedForm';
import { getAlertConditions } from 'services/AlertsSystem/reducer';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

// import classes from './classes';

function renderForm(options) {
  return (<SpeedForm {...options} />);
}

class AlertsSpeed extends React.Component {
  render() {
    const alertsList = this.props.alerts.filter(alrt => alrt.kind === alertKinds._ALERT_KIND_SPEEDING)
          .map(alrt => <SpeedAlert key={alrt.id} alert={alrt} renderForm={renderForm} />);
    return (
      <AlertsSection
        renderForm={renderForm}
        actionButtonLabel={"ADD ALERT"}
        headerLabel={"SPEED ALERTS"}
        children={alertsList}
      />
    );
  }
}

AlertsSpeed.propTypes = {
  alerts: React.PropTypes.array.isRequired,
};

const mapState = (state) => ({
  alerts: getAlertConditions(state),
});
const mapDispatch = {
  // showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(AlertsSpeed));
