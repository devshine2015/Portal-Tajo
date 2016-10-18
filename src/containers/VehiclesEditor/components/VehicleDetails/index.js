import React from 'react';
import pure from 'recompose/pure';
import {
  TextField,
  SelectField,
  MenuItem,
  RaisedButton,
  FlatButton,
  Checkbox,
} from 'material-ui';
import Form from 'components/Form';
import { VEHICLE_KINDS, getVehicleByValue } from 'services/FleetModel/utils/vehiclesMap';
import styles from './styles.css';

const FORM = 'editor';
const STYLES = {
  menuItem: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  disabledField: {
    color: 'rgba(0, 0, 0, 0.870588)',
  },
};

function getOdo({ odometer, isMiles }) {
  // convert miles to kilometres
  const odo = isMiles ? odometer * 1.60934 : odometer;

  return parseInt(odo, 10);
}

class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Initial values for controlled inputs
     **/
    this.state = Object.assign({}, props.details, {
      isMiles: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.checkIfVehicleChanged(nextProps);
  }

  /**
   * Just send state as data
   **/
  onSubmit = (e) => {
    e.preventDefault();
    const nameChanged = this.state.name !== this.props.details.name;

    const toSave = Object.assign({}, this.state, {
      odometer: {
        value: getOdo(this.state),
      },
    });

    this.props.onSave(toSave, nameChanged);
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
      [field]: value.trim(),
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
  checkIfVehicleChanged(nextProps) {
    this.setState({ ...nextProps.details, isMiles: false });
  }

  renderKindMenuItems() {
    return VEHICLE_KINDS.map(kind => {
      const Icon = () => React.cloneElement(kind.icon, {
        className: styles.vehicleIcon,
      });

      return (
        <MenuItem
          key={kind.value}
          value={kind.value}
          primaryText={kind.text}
          leftIcon={<Icon />}
          style={STYLES.menuItem}
        />
      );
    });
  }

  render() {
    let SelectedKindIcon = () => null;

    if (this.state.kind) {
      const selectedKind = getVehicleByValue(this.state.kind);
      SelectedKindIcon = () => selectedKind.icon;
    }

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
            floatingLabelText="Vehicle Name"
            value={this.state.name}
          />

          <div>
            <SelectField
              autoWidth
              hintText="Kind of Vehicle"
              name="kind"
              value={this.state.kind}
              onChange={this.onKindChange}
            >
              {this.renderKindMenuItems()}
            </SelectField>
            <span className={styles.selectedKindIcon}>
              <SelectedKindIcon />
            </span>
          </div>

          <TextField
            fullWidth
            name="licensePlate"
            onChange={this.onChange}
            floatingLabelText="License Plate Number"
            value={this.state.licensePlate}
          />
          <TextField
            disabled
            autoWidth
            floatingLabelFixed
            underlineShow={false}
            name="deviceId"
            floatingLabelText="Device IMEI"
            inputStyle={STYLES.disabledField}
            value={this.props.details.deviceId || ''}
          />
          <TextField
            fullWidth
            name="make"
            onChange={this.onChange}
            floatingLabelText="Manufacturer"
            value={this.state.make}
          />
          <TextField
            fullWidth
            name="model"
            onChange={this.onChange}
            floatingLabelText="Model Name"
            value={this.state.model}
          />
          <TextField
            fullWidth
            name="year"
            onChange={this.onChange}
            floatingLabelText="Year of Manufacture"
            value={this.state.year}
            type="number"
          />
          <TextField
            fullWidth
            name="odometer"
            onChange={this.onChange}
            floatingLabelText="Odometer (km.)"
            value={this.state.odometer}
            type="number"
          />
          <Checkbox
            label="ODO value in miles"
            name="isMiles"
            checked={this.state.isMiles}
            onCheck={this.onIsMilesChange}
          />
          <div className={styles.buttons}>
            <RaisedButton
              className={styles.buttons__button}
              disabled={this.props.disabled}
              onClick={this.onSubmit}
              label="Save"
              type="submit"
              primary
            />
            <FlatButton
              className={styles.buttons__button}
              onClick={this.props.onCancel}
              label="Cancel"
            />
          </div>
        </Form>
      </div>
    );
  }
}

VehicleDetails.propTypes = {
  // Id for detecting if vehicle and its details has been changed
  id: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  details: React.PropTypes.shape({
    deviceId: React.PropTypes.string,
    kind: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    make: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    year: React.PropTypes.string.isRequired,
    licensePlate: React.PropTypes.string.isRequired,
    odometer: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  }).isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
};

export default pure(VehicleDetails);
