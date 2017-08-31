import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { isAlerts } from 'configs';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import { ifArraysEqual } from 'utils/arrays';
import { conditionsActions } from 'services/AlertsSystem/actions';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { getVehicleAlertConditions,
    getAlertConditionByIdFunc, getAlertConditions } from 'services/AlertsSystem/reducer';
import Layout from 'components/Layout';
import FormButtons from 'components/Controls/FormButtons';
import AlertOfKindMultiSelector from './AlertOfKindMultiSelector';
import AlertOfKindSelector from './AlertsOfKindSelector';
import AlertOfKindToggle from './AlertsOfKindToggle';
import phrases from './PropTypes';

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
        this.setVehicleAlerts(vehAlertIds);
      }
    }
  }
  onOfKindChange = (value, theKind) => {
    const idx = this.state.alerts.map(alertId =>
        (this.props.alertById(alertId))).findIndex(alrt => alrt.kind === theKind);
    const nextAlerts = this.state.alerts.slice(0);
    if (idx >= 0) {
      nextAlerts.splice(idx, 1);
    }
    const anotherAlert = this.props.alertById(value);
    if (anotherAlert !== null) {
      this.setState({ alerts: nextAlerts.concat(anotherAlert.id) });
    } else {
      this.setState({ alerts: nextAlerts });
    }
  }
  onOfKindToggle = (isOn, theKind) => {
    const idx = this.state.alerts.map(alertId =>
        (this.props.alertById(alertId))).findIndex(alrt => alrt.kind === theKind);
    const nextAlerts = this.state.alerts.slice(0);
    // if exists - remove
    if (idx >= 0) {
      nextAlerts.splice(idx, 1);
      this.setState({ alerts: nextAlerts });
      return;
    }
    const theAlertCondition = this.props.alertConditions.find(alrt => alrt.kind === theKind);
    if (theAlertCondition === undefined) {
      // we do not have alert conditon of theKind
      return;
    }
    this.setState({ alerts: nextAlerts.concat(theAlertCondition.id) });
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
    this.setVehicleAlerts(this.props.getVehicleAlerts(this.props.vehicleId));
  }
  setVehicleAlerts = (alertsSrc) => {
    this.setState({
      alerts: alertsSrc.slice(0),
      isLoading: false,
    });
  }
  fetchAlerts = (vehicleId) => {
    this.props.fetchVehicleAlertConditions(vehicleId)
      .then(() => {
        this.setVehicleAlerts(this.props.getVehicleAlerts(this.props.vehicleId));
      });
  }

// Temp -15&#8451;..-8&#8451;
  render() {
    if (!isAlerts) return null;
    const haveAlertConditions = this.props.alertConditions.length > 0;
    if (!haveAlertConditions) return null;
    const isTouched = this.props.getVehicleAlerts(this.props.vehicleId) === null
    || !ifArraysEqual(this.state.alerts, this.props.getVehicleAlerts(this.props.vehicleId));
    const { translations } = this.props;

    return (
      <Layout.Section>
        <Layout.Header label={`${translations.alerts}${this.state.isLoading ? ` ${translations.loading}` : ''}`} />
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
          <AlertOfKindToggle
            myKind={alertKinds._ALERT_KIND_IDLE}
            onOfKindChange={this.onOfKindToggle}
            vehicleAlerts={this.state.alerts}
          />
          <AlertOfKindMultiSelector
            title={translations.maintenance}
            vehicleAlerts={this.state.alerts}
            vehicleId={this.props.vehicleId}
            doAddAlert={this.doAddAlert}
            onRemoveClick={this.onRemoveClick}
            alertFilter={a => (a.kind === alertKinds._ALERT_KIND_ODO)}
          />
          {/* put all the GF alerts with chips here?*/}
          <AlertOfKindMultiSelector
            title={translations.on_enter_location}
            vehicleAlerts={this.state.alerts}
            vehicleId={this.props.vehicleId}
            doAddAlert={this.doAddAlert}
            onRemoveClick={this.onRemoveClick}
            alertFilter={a => (a.kind === alertKinds._ALERT_KIND_GF && a.onEnter === true)}
          />
          <AlertOfKindMultiSelector
            title={translations.on_exit_location}
            vehicleAlerts={this.state.alerts}
            vehicleId={this.props.vehicleId}
            doAddAlert={this.doAddAlert}
            onRemoveClick={this.onRemoveClick}
            alertFilter={a => (a.kind === alertKinds._ALERT_KIND_GF && a.onEnter === false)}
          />
          <FormButtons
            onSubmit={this.saveAlerts}
            onCancel={this.resetChange}
            cancelLabel={translations.reset}
            isDisabled={!isTouched}
          />
        </Layout.Content>
      </Layout.Section>
    );
  }
}

VehicleAlerts.propTypes = {
  vehicleId: PropTypes.string.isRequired,
  getVehicleAlerts: PropTypes.func.isRequired,
  fetchVehicleAlertConditions: PropTypes.func.isRequired,
  postVehicleAlertConditions: PropTypes.func.isRequired,
  alertById: PropTypes.func.isRequired,
  alertConditions: PropTypes.array.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
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

export default connect(mapState, mapDispatch)(translate(phrases)(PureVehicleAlerts));

