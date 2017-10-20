import React from 'react';
import pure from 'recompose/pure';
import R from 'ramda';
import PropTypes from 'prop-types';
import {
  TextField,
  Checkbox,
} from 'material-ui';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import Layout from 'components/Layout';
import FormButtons from 'components/Controls/FormButtons';
import DeviceEditor from '../DeviceEditor';
import VehicleAlerts from '../VehicleAlerts';
import VehicleKindSelector from '../VehicleKindSelector';
import MarkerSelector from '../MarkerSelector/MarkerSelector';
import DriverSelector from '../DriverSelector/DriverSelector';
import styles from './styles.css';
import phrases, { detailsShape } from './PropTypes';

function setVehicleState(props) {
  return Object.assign({}, props.details, {
    deviceId: props.details.deviceId || '',
    isMiles: false,
    marker: props.details.marker,
    driverId: props.details.driverId,
    isTouched: false,
  });
}

function checkIfDeviceChanged(state, props) {
  return state.deviceId !== props.details.deviceId;
}

const toMiles = needConvertToMiles => (kms) => {
  const odo = needConvertToMiles ? kms * 1.60934 : kms;

  return parseInt(odo, 10);
};
const toMeters = val => val * 1000;

class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Initial values for controlled inputs
     * */
    this.state = setVehicleState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.details.id !== nextProps.details.id) {
      this.setNewVehicleDetails(nextProps);
    }
  }

  /**
   * Just send state as data
   * */
  onSubmit = (e) => {
    e.preventDefault();
    const nameChanged = this.state.name !== this.props.details.name;
    const deviceChanged = checkIfDeviceChanged(this.state, this.props);

    const device = {
      needDetach: !!this.props.details.deviceId && deviceChanged,
      needAttach: !!this.state.deviceId && deviceChanged,
    };

    // backend expecting to receive meters
    const nextOdo = R.compose(toMiles(this.state.isMiles), toMeters)(this.state.odometer);

    const toSave = Object.assign({}, this.state, {
      fuelCapacity: parseInt(this.state.fuelCapacity, 10),
      odometer: {
        value: nextOdo,
      },
      lastServiceOdo: {
        value: parseInt(this.state.lastServiceOdo, 10),
      },
      meta: {
        marker: this.state.marker,
        driverId: this.state.driverId,
      },
    });

    this.props.onSave(toSave, nameChanged, device);
    this.setState({
      isTouched: false,
    });
  }

  onIsMilesChange = (e, isCheked) => {
    this.setState({
      isMiles: isCheked,
      isTouched: true,
    });
  }

  /**
   * Update state[field] with value
   * */
  onChange = (e, value) => {
    const field = e.target.name;

    this.setState({
      [field]: value,
      isTouched: true,
    });
  }

  onKindChange = (e, key, value) => {
    this.setState({
      kind: value,
      isTouched: true,
    });
  }

  onMarkerChange = (e, key, value) => {
    this.setState({
      marker: value,
      isTouched: true,
    });
  }

  onDriverChange = (e, key, value) => {
    this.setState({
      driverId: value,
      isTouched: true,
    });
  }

  /**
   * Update state if another vehicle has been chosen
   * */
  setNewVehicleDetails = (nextProps) => {
    this.setState(setVehicleState(nextProps));
  }

  resetChanges = () => {
    this.setState(setVehicleState(this.props));
    this.props.onCancel();
    this.setState({
      isTouched: false,
    });
  }

  updateDeviceId = (deviceId) => {
    this.setState({
      deviceId,
      isTouched: true,
    });
  }

  render() {
    const { translations } = this.props;

    return (
      <div className={styles.details}>
        <Layout.Section>
          <Layout.Header label={translations.parameters} />
          <Layout.Content>
            <TextField
              fullWidth
              name="name"
              onChange={this.onChange}
              floatingLabelText={translations.vehicle_name}
              value={this.state.name}
            />

            <VehicleKindSelector
              kind={this.state.kind}
              onChange={this.onKindChange}
            />

            <TextField
              fullWidth
              name="chassisNumber"
              onChange={this.onChange}
              floatingLabelText={translations.chassis_number}
              value={this.state.chassisNumber}
            />

            <TextField
              fullWidth
              name="licensePlate"
              onChange={this.onChange}
              floatingLabelText={translations.license_plate}
              value={this.state.licensePlate}
            />

            <DeviceEditor
            // vehicleId={this.props.details.id}
              deviceId={this.state.deviceId}
              updateDeviceId={this.updateDeviceId}
            />

            <TextField
              fullWidth
              name="make"
              onChange={this.onChange}
              floatingLabelText={translations.manufacturer}
              value={this.state.make}
            />
            <TextField
              fullWidth
              name="model"
              onChange={this.onChange}
              floatingLabelText={translations.model_name}
              value={this.state.model}
            />
            <TextField
              fullWidth
              name="year"
              onChange={this.onChange}
              floatingLabelText={translations.year_of_manufacture}
              value={this.state.year}
              type="number"
            />
            <TextField
              fullWidth
              name="lastServiceOdo"
              onChange={this.onChange}
              floatingLabelText={translations.last_service_odo}
              value={this.state.lastServiceOdo}
              type="number"
            />
            <TextField
              fullWidth
              name="odometer"
              onChange={this.onChange}
              floatingLabelText={translations.odometer_value}
              value={this.state.odometer}
              type="number"
            />
            <Checkbox
              label={translations.odo_in_miles}
              name="isMiles"
              checked={this.state.isMiles}
              onCheck={this.onIsMilesChange}
            />
            <TextField
              fullWidth
              name="fuelCapacity"
              onChange={this.onChange}
              floatingLabelText={translations.fuel_capacity}
              value={this.state.fuelCapacity}
              type="number"
            />
            <DriverSelector driverId={this.state.driverId} onChange={this.onDriverChange} />
            <MarkerSelector kind={this.state.marker} onChange={this.onMarkerChange} />
            <FormButtons
              onSubmit={this.onSubmit}
              onCancel={this.resetChanges}
              cancelLabel={translations.reset}
              isDisabled={!this.state.isTouched}
            />
          </Layout.Content>
        </Layout.Section>
        <VehicleAlerts
          vehicleId={this.props.details.id}
        />
      </div>
    );
  }
}

VehicleDetails.propTypes = {
  // disabled: PropTypes.bool.isRequired,
  // isLoading: PropTypes.bool.isRequired,
  details: detailsShape.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  // onDisable: PropTypes.func.isRequired,

  translations: makePhrasesShape(phrases).isRequired,

  // userPermittedTo: PropTypes.shape({
  //   [permissions.VEHICLE_DISABLE]: PropTypes.bool.isRequired,
  // }),
};

const Translated = translate(phrases)(VehicleDetails);

export default pure(Translated);
