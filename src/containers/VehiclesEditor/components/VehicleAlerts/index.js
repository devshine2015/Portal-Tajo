import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { Paper, SelectField, MenuItem } from 'material-ui';
import { getVehicleAlertConditions,
    getAlertConditionByIdFunc, getAlertConditions } from 'services/AlertsSystem/reducer';

import { fetchVehicleAlertConditions, postVehicleAlertConditions } from 'services/AlertsSystem/actions';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { isAlerts } from 'configs';

import styles from './styles.css';

// const stylesChip = {
//   margin: 4,
// };

const AlertOfKindSelectorFn = ({
  myKind,
  alertConditions,
  onOfKindChange,
  vehicleAlerts,
  alertById,
}, context) => {
  const myAlertOfKind = vehicleAlerts.map(alertId => (alertById(alertId))).find(alrt => alrt.kind === myKind);
  const theKindData = alertKinds.getAlertByKind(myKind);
  // const Icon = () => React.cloneElement(theKindData.icon, {
  //       className: styles.vehicleIcon,
  //     });
  const itemsList = [(<MenuItem key={"NONE"} value={"NONE"} primaryText={"No Alert"} />)]
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
        hintText={ "SPEED" }
        name="kind"
        value={myAlertOfKind !== undefined ? myAlertOfKind.id : 'NONE'}
        onChange={(e, key, value) => {onOfKindChange(value, myKind);}}
        style={{ top: '3px' }}
      >
        {itemsList}
      </SelectField>
    </div>);
};

AlertOfKindSelectorFn.propTypes = {
  myKind: React.PropTypes.string.isRequired,
  onOfKindChange: React.PropTypes.func.isRequired,

  alertConditions: React.PropTypes.array.isRequired,
  vehicleAlerts: React.PropTypes.array.isRequired,
  alertById: React.PropTypes.func.isRequired,
};
AlertOfKindSelectorFn.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

const mapStateA = (state) => ({
  getVehicleAlerts: getVehicleAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
  alertConditions: getAlertConditions(state),
});
const mapDispatchA = {
  fetchVehicleAlertConditions,
  postVehicleAlertConditions,
};

const AlertOfKindSelector = connect(mapStateA, mapDispatchA)(pure(AlertOfKindSelectorFn));


class VehicleAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false,
      isLoading: true,
      alerts: [],
    };
    this.props.saveHook(this.saveAlerts);
    this.fetchAlerts(props.vehicleId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vehicleId !== nextProps.vehicleId) {
      const vehAlertIds = this.props.getVehicleAlerts(nextProps.vehicleId);
      if (vehAlertIds === null) {
        this.setState({ alerts: [],
          isLoading: true });
        this.fetchAlerts(nextProps.vehicleId);
      } else {
        this.setState({ alerts: vehAlertIds,
          isLoading: false });
      }
    }
  }
  onOfKindChange = (value, theKind) => {
    const idx = this.state.alerts.map(alertId =>
        (this.props.alertById(alertId))).findIndex(alrt => alrt.kind === theKind);
    const nextAlerts = this.state.alerts;
    if (idx >= 0) {
      nextAlerts.splice(idx, 1);
    }
    const anotherAlert = this.props.alertById(value);
    if (anotherAlert !== null) {
      this.setState({ alerts: nextAlerts.concat(anotherAlert.id) });
    } else {
      this.setState({ alerts: nextAlerts.slice(0) });
    }
  }
  onRemoveClick = alertId => {
    this.setState({ alerts: this.state.alerts.filter((el) => (el !== alertId)) });
  }
  onAddClick = () => {
    this.setState({ isAdding: !this.state.isAdding });
  }
  doAddAlert = alertId => {
    this.setState({ alerts: this.state.alerts.concat([alertId]) });
  }
  saveAlerts = () => {
    this.props.postVehicleAlertConditions(this.props.vehicleId, this.state.alerts);
  }
  fetchAlerts = vehicleId => {
    this.props.fetchVehicleAlertConditions(vehicleId)
      .then(() => {
        // const vehAlertIds = this.props.getVehicleAlerts(nextProps.vehicleId);
        this.setState({ alerts: this.props.getVehicleAlerts(vehicleId),
          isLoading: false });
      });
  }

// Temp -15&#8451;..-8&#8451;
  render() {
    if (!isAlerts) return null;

    /* const vehAlerts = this.state.alerts.map(alertId => {
      const alertObj = this.props.alertById(alertId);
      const alertKindData = alertKinds.getAlertByKind(alertObj.kind);
      return (<Chip
        key={alertId}
        onRequestDelete={ () => (this.onRemoveClick(alertId)) }
        style={stylesChip}
      >
          <Avatar color="#156671" icon={alertKindData.icon} />
            {alertObj.name}
          </Chip>);
    });*/

    return (
      <Paper zDepth={2} className={styles.wrapper}>
        <div className={styles.wrapperHeader}>
          {`ALERTS${this.state.isLoading ? ' loading...' : ''}`}
        </div>
        <AlertOfKindSelector
          myKind={alertKinds._ALERT_KIND_SPEEDING}
          onOfKindChange={this.onOfKindChange}
          vehicleAlerts={this.state.alerts}
        />
        <AlertOfKindSelector
          myKind={alertKinds._ALERT_KIND_TEMPERATURE}
          onOfKindChange={this.onOfKindChange}
          vehicleAlerts={this.state.alerts}
        />
        <AlertOfKindSelector
          myKind={alertKinds._ALERT_KIND_ODO}
          onOfKindChange={this.onOfKindChange}
          vehicleAlerts={this.state.alerts}
        />
        {/* put all th GF alerts with chips here?*/}
        {/* <div className={styles.chipsWrapper}>
        {vehAlerts}
        </div>*/}
      </Paper>
    );
  }
}

VehicleAlerts.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  getVehicleAlerts: React.PropTypes.func.isRequired,
  fetchVehicleAlertConditions: React.PropTypes.func.isRequired,
  postVehicleAlertConditions: React.PropTypes.func.isRequired,
  alertById: React.PropTypes.func.isRequired,

  saveHook: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  getVehicleAlerts: getVehicleAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
  alertConditions: getAlertConditions(state),
});
const mapDispatch = {
  fetchVehicleAlertConditions,
  postVehicleAlertConditions,
};

const PureVehicleAlerts = pure(VehicleAlerts);

export default connect(mapState, mapDispatch)(PureVehicleAlerts);

