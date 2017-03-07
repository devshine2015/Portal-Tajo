import React from 'react';
import pure from 'recompose/pure';
import {
  TextField,
  FlatButton,
  Checkbox,
} from 'material-ui';
import Form from 'components/Form';
import ButtonWithProgress from 'components/ButtonWithProgress';
import DeviceEditor from '../DeviceEditor';
import VehicleKindSelector from '../VehicleKindSelector';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, {
  phrasesShape,
  detailsShape,
} from './PropTypes';

const FORM = 'editor';

function getOdo({ odometer, isMiles }) {
  // convert miles to kilometres
  const odo = isMiles ? odometer * 1.60934 : odometer;

  return parseInt(odo, 10);
}

function setVehicleState(props) {
  return {
    ...props.details,
    isMiles: false,
  };
}

function checkIfDeviceChanged(state, props) {
  return state.deviceId !== props.details.deviceId;
}

class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Initial values for controlled inputs
     **/
    this.state = setVehicleState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.details.id !== nextProps.id) {
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

    const toSave = Object.assign({}, this.state, {
      odometer: {
        value: getOdo(this.state),
      },
    });

    this.props.onSave(toSave, nameChanged, device);
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

  render() {
    const { translations } = this.props;

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
            vehicleId={this.props.details.id}
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
          </div>
        </Form>
      </div>
    );
  }
}

VehicleDetails.propTypes = {
  // Id for detecting if vehicle and its details has been changed
  disabled: React.PropTypes.bool.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  details: detailsShape.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,
};

export default pure(translate(phrases)(VehicleDetails));
