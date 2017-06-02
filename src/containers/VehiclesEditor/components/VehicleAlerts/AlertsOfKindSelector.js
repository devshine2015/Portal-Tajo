import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Avatar, SelectField, MenuItem } from 'material-ui';
import { getVehicleAlertConditions,
    getAlertConditionByIdFunc, getAlertConditions } from 'services/AlertsSystem/reducer';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

import styles from './styles.css';

const AlertOfKindSelector = ({
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
  // const Icon = () => React.cloneElement(theKindData.icon, {
  //       className: styles.vehicleIcon,
  //     });
  const itemsList = [(<MenuItem key={'NONE'} value={'NONE'} primaryText={'No Alert'} />)]
    .concat(alertConditions.filter(alrt => alrt.kind === myKind)
      .map(alrt => <MenuItem key={alrt.id} value={alrt.id} primaryText={alrt.name} />));
  // const itemsList = alertConditions.filter(alrt => alrt.kind === myKind)
  //   .map(alrt => <MenuItem value={alrt.id} primaryText={alrt.name} />);
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
      <SelectField
        autoWidth
        hintText={'SPEED'}
        name="kind"
        value={myAlertOfKind !== undefined ? myAlertOfKind.id : 'NONE'}
        onChange={(e, key, value) => { onOfKindChange(value, myKind); }}
        style={{ top: '3px' }}
      >
        {itemsList}
      </SelectField>
    </div>);
};

AlertOfKindSelector.propTypes = {
  myKind: React.PropTypes.string.isRequired,
  onOfKindChange: React.PropTypes.func.isRequired,

  alertConditions: React.PropTypes.array.isRequired,
  vehicleAlerts: React.PropTypes.array.isRequired,
  alertById: React.PropTypes.func.isRequired,
};
AlertOfKindSelector.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

const mapStateA = state => ({
  getVehicleAlerts: getVehicleAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
  alertConditions: getAlertConditions(state),
});

export default connect(mapStateA)(pure(AlertOfKindSelector));

