import React from 'react';
import pure from 'recompose/pure';
import R from 'ramda';
import {
  TextField,
  FlatButton,
  Checkbox,
} from 'material-ui';
import { permissions } from 'configs/roles';
import Form from 'components/Form';
import ButtonWithProgress from 'components/ButtonWithProgress';
import DeviceEditor from '../DeviceEditor';
import VehicleAlerts from '../VehicleAlerts';
import VehicleKindSelector from '../VehicleKindSelector';
import MarkerSelector from '../MarkerSelector/MarkerSelector';
import VehicleDisabler from '../VehicleDisabler';
import { translate } from 'utils/i18n';
import permitted from 'utils/permissionsRequired';

import styles from './styles.css';
import phrases, {
  phrasesShape,
  detailsShape,
} from './PropTypes';

const FORM = 'editor';

const PERMISSIONS = [
  permissions.VEHICLE_DISABLE,
];

function setVehicleState(props) {
  return Object.assign({}, props.details, {
    deviceId: props.details.deviceId || '',
    isMiles: false,
    marker: props.details.marker,
  });
}

function checkIfDeviceChanged(state, props) {
  return state.deviceId !== props.details.deviceId;
}

const toMiles = (needConvertToMiles) => (kms) => {
  const odo = needConvertToMiles ? kms * 1.60934 : kms;

  return parseInt(odo, 10);
};
const toMeters = val => val * 1000;

class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Initial values for controlled inputs
     **/
    this.state = setVehicleState(props);

    // TODO: some hook to save/post whatever we have in alerts controller
    // the whole alerts seuUP workflow needs change - MVP for now
    this.alertsSaveHook = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.details.id !== nextProps.details.id) {
      this.setNewVehicleDetails(nextProps);
    }
  }

  /**
   * Just send state as data
   **/
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
      odometer: {
        value: nextOdo,
      },
      meta: {
        marker: this.state.marker,
      },
    });

    this.props.onSave(toSave, nameChanged, device);

    if (this.alertsSaveHook !== null) {
      this.alertsSaveHook();
    }
  }

  onIsMilesChange = (e, isCheked) => {
    this.setState({
      isMiles: isCheked,
    });
  }

  /**
   * Update state[field] with value
   **/
  onChange = (e, value) => {
    const field = e.target.name;

    this.setState({
      [field]: value,
    });
  }

  onKindChange = (e, key, value) => {
    this.setState({
      kind: value,
    });
  }

  onMarkerChange = (e, key, value) => {
    this.setState({
      marker: value,
    });
  }

  /**
   * Update state if another vehicle has been chosen
   **/
  setNewVehicleDetails(nextProps) {
    this.setState(setVehicleState(nextProps));
  }

  updateDeviceId = deviceId => {
    this.setState({
      deviceId,
    });
  }

  registerAlertsSave = saveAlerts => {
    this.alertsSaveHook = saveAlerts;
  }

  render() {
    const { translations } = this.props;
    const canDisable = this.props.userPermittedTo[permissions.VEHICLE_DISABLE];

    return (
      <div className={styles.details}>
        <Form
          name={FORM}
          onSubmit={this.onSubmit}
        >
          <TextField
            fullWidth
            name="name"
            onChange={this.onChange}
            floatingLabelText={ translations.vehicle_name }
            value={this.state.name}
          />

          <VehicleKindSelector
            kind={this.state.kind}
            onChange={this.onKindChange}
          />

          <TextField
            fullWidth
            name="licensePlate"
            onChange={this.onChange}
            floatingLabelText={ translations.license }
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
            floatingLabelText={ translations.manufacturer }
            value={this.state.make}
          />
          <TextField
            fullWidth
            name="model"
            onChange={this.onChange}
            floatingLabelText={ translations.model_name }
            value={this.state.model}
          />
          <TextField
            fullWidth
            name="year"
            onChange={this.onChange}
            floatingLabelText={ translations.year }
            value={this.state.year}
            type="number"
          />
          <TextField
            fullWidth
            name="odometer"
            onChange={this.onChange}
            floatingLabelText={ translations.odometer_value }
            value={this.state.odometer}
            type="number"
          />
          <Checkbox
            label={ translations.odo_in_miles }
            name="isMiles"
            checked={this.state.isMiles}
            onCheck={this.onIsMilesChange}
          />
          <MarkerSelector kind={this.state.marker} onChange={this.onMarkerChange} />
          <VehicleAlerts
            vehicleId={this.props.details.id}
            saveHook={this.registerAlertsSave}
          />
          <div className={styles.buttons}>
            <ButtonWithProgress
              className={styles.buttons__button}
              disabled={this.props.disabled}
              onClick={this.onSubmit}
              isLoading={this.props.isLoading}
              label={ translations.save }
              type="submit"
              primary
            />
            <FlatButton
              className={styles.buttons__button}
              onClick={this.props.onCancel}
              label={ translations.cancel }
            />

            { canDisable && (
              <VehicleDisabler
                className={styles.buttons__button}
                label={translations.disable}
                disabled={this.props.disabled}
                isLoading={this.props.isLoading}
                disableVehicle={this.props.onDisable}
                meta={{
                  vehicleName: this.props.details.name,
                  vehicleId: this.props.details.id,
                  deviceId: this.props.details.deviceId,
                }}
              />
            )}

          </div>

        </Form>
      </div>
    );
  }
}

VehicleDetails.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  details: detailsShape.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onDisable: React.PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,

  userPermittedTo: React.PropTypes.shape({
    [permissions.VEHICLE_DISABLE]: React.PropTypes.bool.isRequired,
  }),
};

const Translated = translate(phrases)(VehicleDetails);
const WithPermissions = permitted(PERMISSIONS)(Translated);

export default pure(WithPermissions);
