import React from 'react';
import PropTypes from 'prop-types';
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
  myKind: PropTypes.string.isRequired,
  onOfKindChange: PropTypes.func.isRequired,

  alertConditions: PropTypes.array.isRequired,
  vehicleAlerts: PropTypes.array.isRequired,
  alertById: PropTypes.func.isRequired,
};
AlertOfKindToggle.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

const mapState = state => ({
  getVehicleAlerts: getVehicleAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
  alertConditions: getAlertConditions(state),
});

export default connect(mapState)(pure(AlertOfKindToggle));

