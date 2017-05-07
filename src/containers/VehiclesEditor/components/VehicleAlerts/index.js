import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Avatar, SelectField, MenuItem } from 'material-ui';
import { getVehicleAlertConditions,
    getAlertConditionByIdFunc, getAlertConditions } from 'services/AlertsSystem/reducer';
import Layout from 'components/Layout';
import FormButtons from 'components/Controls/FormButtons';
import { conditionsActions } from 'services/AlertsSystem/actions';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { isAlerts } from 'configs';
import { ifArraysEqual } from 'utils/arrays';
import GFAlerts from './GFAlerts';

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

const mapStateA = state => ({
  getVehicleAlerts: getVehicleAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
  alertConditions: getAlertConditions(state),
});

const AlertOfKindSelector = connect(mapStateA)(pure(AlertOfKindSelectorFn));


class VehicleAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false,
      isLoading: true,
      alerts: [],
    };
    this.fetchAlerts(props.vehicleId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vehicleId !== nextProps.vehicleId) {
      const vehAlertIds = nextProps.getVehicleAlerts(nextProps.vehicleId);
      if (vehAlertIds === null) {
        this.setState({ alerts: [],
          isLoading: true });
        this.fetchAlerts(nextProps.vehicleId);
      } else {
        this.setVehicleAlerts();
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
  onRemoveClick = (alertId) => {
    this.setState({ alerts: this.state.alerts.filter(el => (el !== alertId)) });
  }
  onAddClick = () => {
    this.setState({ isAdding: !this.state.isAdding });
  }
  doAddAlert = (alertId) => {
    this.setState({ alerts: this.state.alerts.concat([alertId]) });
  }
  saveAlerts = () => {
    this.props.postVehicleAlertConditions(this.props.vehicleId, this.state.alerts);
  }
  resetChange = () => {
    this.setVehicleAlerts();
  }
  setVehicleAlerts = () => {
    this.setState({
      alerts: this.props.getVehicleAlerts(this.props.vehicleId).slice(0),
      isLoading: false,
    });
  }
  fetchAlerts = (vehicleId) => {
    this.props.fetchVehicleAlertConditions(vehicleId)
      .then(() => {
        this.setVehicleAlerts();
      });
  }

// Temp -15&#8451;..-8&#8451;
  render() {
    if (!isAlerts) return null;
    const haveAlertConditions = this.props.alertConditions.length > 0;
    if (!haveAlertConditions) return null;
    const isTouched = !ifArraysEqual(this.state.alerts, this.props.getVehicleAlerts(this.props.vehicleId));
    return (
      <Layout.Section>
        <Layout.Header label={`ALERTS${this.state.isLoading ? ' loading...' : ''}`} />
        <Layout.Content>
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
          {/* put all the GF alerts with chips here?*/}
          <GFAlerts
            vehicleAlerts={this.state.alerts}
            vehicleId={this.props.vehicleId}
            doAddAlert={this.doAddAlert}
            onRemoveClick={this.onRemoveClick}
            onEnter
          />
          <GFAlerts
            vehicleAlerts={this.state.alerts}
            vehicleId={this.props.vehicleId}
            doAddAlert={this.doAddAlert}
            onRemoveClick={this.onRemoveClick}
            onEnter={false}
          />
          <FormButtons
            onSubmit={this.saveAlerts}
            onCancel={this.resetChange}
            cancelLabel={'reset'}
            isDisabled={!isTouched}
          />
        </Layout.Content>
      </Layout.Section>
    );
  }
}

VehicleAlerts.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  getVehicleAlerts: React.PropTypes.func.isRequired,
  fetchVehicleAlertConditions: React.PropTypes.func.isRequired,
  postVehicleAlertConditions: React.PropTypes.func.isRequired,
  alertById: React.PropTypes.func.isRequired,
  alertConditions: React.PropTypes.array.isRequired,
};

const mapState = state => ({
  getVehicleAlerts: getVehicleAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
  alertConditions: getAlertConditions(state),
});
const mapDispatch = {
  fetchVehicleAlertConditions: conditionsActions.fetchVehicleAlertConditions,
  postVehicleAlertConditions: conditionsActions.postVehicleAlertConditions,
};

const PureVehicleAlerts = pure(VehicleAlerts);

export default connect(mapState, mapDispatch)(PureVehicleAlerts);

