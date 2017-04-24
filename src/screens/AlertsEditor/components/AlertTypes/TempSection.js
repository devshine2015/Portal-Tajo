import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import AlertsSection from './../AlertsSection/AlertsSection';
import TampAlert from './TempAlert';
import { getAlertConditions } from 'services/AlertsSystem/reducer';
import * as alertKinds from 'services/AlertsSystem/alertKinds';


// import classes from './classes';

function renderForm(options) {
  return <div />;
}

class TempSection extends React.Component {
  render() {
    const alertsList = this.props.alerts.filter(alrt => alrt.kind === alertKinds._ALERT_KIND_TEMPERATURE)
          .map(alrt => <TampAlert key={alrt.id} alert={alrt} />);
    return (
      <AlertsSection
        renderForm={renderForm}
        actionButtonLabel={"ADD ALERT"}
        headerLabel={"TEMPERATURE ALERTS"}
        children={alertsList}
      />
    );
  }
}

TempSection.propTypes = {
  alerts: React.PropTypes.array.isRequired,
};

const mapState = (state) => ({
  alerts: getAlertConditions(state),
});
const mapDispatch = {
  // showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(TempSection));
