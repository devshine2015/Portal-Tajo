import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Avatar, Checkbox } from 'material-ui';
import { getVehicleAlertConditions,
    getAlertConditionByIdFunc, getAlertConditions } from 'services/AlertsSystem/reducer';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

import styles from './styles.css';

const AlertOfKindToggle = ({
  myKind,
  alertConditions,
  onOfKindChange,
  vehicleAlerts,
  alertById,
}, context) => {
  const myAlertOfKind = vehicleAlerts.map(alertId => (alertById(alertId)))
    // check for null - the alert condition might be not loaded yet
    .find(alrt => alrt !== null && alrt.kind === myKind);
  const theKindData = alertKinds.getAlertByKind(myKind);
  const isToggled = myAlertOfKind !== undefined;
  return (
    <div className={styles.kindOfSelector} key={myKind} >
      <div className={styles.kindOfLabel}>
        <Avatar
          backgroundColor={context.muiTheme.palette.primary1Color}
          color="#fff"
          icon={theKindData.icon}
          style={{ position: 'relative', top: '6px' }}
        />
        <span className={styles.kindOfName}> {theKindData.niceName} </span>
      </div>    
      <Checkbox
        style={{ top: 12, width: 256 }}
        checked={isToggled}
        onCheck={(event, isInputChecked) => { onOfKindChange(isInputChecked, myKind); }}
      />
    </div>);
};

AlertOfKindToggle.propTypes = {
  myKind: React.PropTypes.string.isRequired,
  onOfKindChange: React.PropTypes.func.isRequired,

  alertConditions: React.PropTypes.array.isRequired,
  vehicleAlerts: React.PropTypes.array.isRequired,
  alertById: React.PropTypes.func.isRequired,
};
AlertOfKindToggle.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

const mapState = state => ({
  getVehicleAlerts: getVehicleAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
  alertConditions: getAlertConditions(state),
});

export default connect(mapState)(pure(AlertOfKindToggle));

