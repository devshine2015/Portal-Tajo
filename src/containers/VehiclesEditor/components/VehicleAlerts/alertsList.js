import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { getAlertConditions } from 'services/AlertsSystem/reducer';

import styles from './styles.css';

const stylesChip = {
  margin: 3,
  width: 'initial',
};


class AlertsList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.id !== nextProps.id) {
  //     this.setNewVehicleDetails(nextProps);
  //   }
  // }
  onItemClick = (alertId) => {
    // add condition to the vehicle
    this.props.doAddAlert(alertId);
  }

  vehicleHasAlert = (alertId) => (
    this.props.vehicleAlerts
          .find(el => el === alertId) !== undefined
  )

  render() {
    const alertsToPick = this.props.alerts.map(item => (this.vehicleHasAlert(item.id) ? null :
       (<Chip
         key={item.id}
         onTouchTap={() => this.onItemClick(item.id)}
         style={stylesChip}
       >
         <Avatar color="#156671" icon={alertKinds.getAlertByKind(item.kind).icon} />
         {item.name}
       </Chip>)));
    return (
      <div className={styles.alertsList}>
        {alertsToPick}
      </div>
    );
  }
}

AlertsList.propTypes = {
  vehicleAlerts: React.PropTypes.array.isRequired,
  doAddAlert: React.PropTypes.func.isRequired,
  // getVehicleAlerts: React.PropTypes.func.isRequired,
  alerts: React.PropTypes.array.isRequired,
};

const mapState = (state) => ({
  alerts: getAlertConditions(state),
});
const mapDispatch = null;

const PureAlertsList = pure(AlertsList);

export default connect(mapState, mapDispatch)(PureAlertsList);

