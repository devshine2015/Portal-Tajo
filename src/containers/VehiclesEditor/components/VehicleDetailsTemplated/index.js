import React from 'react';
import pure from 'recompose/pure';
import R from 'ramda';
import PropTypes from 'prop-types';
import { TextField, Checkbox, SelectField, MenuItem } from 'material-ui';
import { translate, makePhrasesShape } from 'utils/i18n';
import Layout from 'components/Layout';
import FormButtons from 'components/Controls/FormButtons';

import DeviceEditor from '../DeviceEditor';
// import VehicleAlerts from '../VehicleAlerts';
import VehicleKindSelector from '../VehicleKindSelector';
import MarkerSelector from '../MarkerSelector/MarkerSelector';
import DriverSelector from '../DriverSelector/DriverSelector';
import styles from './styles.css';
import phrases, { detailsShape } from './PropTypes';

// TODO: remove "excel-loader", keep the static data in .json
import workbook from './Truck.xls';

// TODO: use permissions for ODO editing
// const canShowDevicesManager = () => authorizeWithPermissions('view:devices_manager');

// inValue : string "1200-1600" or integer number
function extractMinNumber(inValue) {
  return parseInt(inValue, 10);
}
function extractMaxNumber(inValue) {
  if (isNaN(inValue)) {
    const minMax = inValue.split('-');
    return parseInt(minMax[1], 10);
  }
  return parseInt(inValue, 10);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function containsAll(needles, haystack) {
  const haystackStr = haystack.map(a => a.toString());
  for (let i = 0, len = needles.length; i < len; i++) {
    if (haystackStr.indexOf(needles[i].toString()) === -1) return false;
    // if ($.inArray(needles[i], haystack) == -1) return false;
  }
  return true;
}

function setVehicleState(props) {
  return Object.assign({}, props.details, {
    deviceId: props.details.deviceId || '',
    isMiles: false,
    marker: props.details.marker,
    driverId: props.details.driverId,
    isTouched: false,
    year: props.details.year,
    make: props.details.make,
    model: props.details.model,
    maxPower: '400',
    maxRpm: '1800',
    maxTorque: '1850',
    rpm: '1850',
    fuelCapacity: '550',
    powertrain: '6x4',
    gearbox: 'S',
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

const yearmanufacture = [];

function feedYearManufacture() {
  const d = new Date();
  const curYear = d.getFullYear();
  for (let i = 0; i < 3; i++) {
    yearmanufacture.push((curYear - i).toString());
  }
}

feedYearManufacture();

class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Initial values for controlled inputs
     * */
    this.state = setVehicleState(props);
    // this.brandChange = this.brandChange.bind(this);
    // this.modelChange = this.modelChange.bind(this);
    // this.calculateOtherFields = this.calculateOtherFields.bind(this);

    // this.calculateOtherFields();
  }

  brandChange = (event, index, value) => {
    let model = 'FJ1823';
    if (this.state.make !== value) {
      console.log(value);
      // TODO: no hardcoded default values
      if (value === 'Fuso') {
        model = 'FJ1823';
      }
      if (value === 'Mercedes-Benz') {
        model = '3340';
      }
    }

    this.setState(
      {
        make: value,
        model,
      },
      () => {
        this.calculateOtherFields();
      },
    );
  }
  modelChange = (event, index, value) => {
    this.setState(
      {
        model: value.toString(),
      },
      () => {
        this.calculateOtherFields();
      },
    );
  }

  calculateOtherFields = (isTouched = true) => {
    // TODO: no hardcoded limits
    for (let i = 1; i < 10; i++) {
      if (
        containsAll(
          [this.state.make, this.state.model],
          workbook[0].data[i],
        )
      ) {
        this.setState({ maxPower: workbook[0].data[i][2],
          maxRpm: workbook[0].data[i][3],
          maxTorque: workbook[0].data[i][4],
          rpm: workbook[0].data[i][5],
          fuelCapacity: workbook[0].data[i][6],
          powertrain: workbook[0].data[i][7],
          gearbox: workbook[0].data[i][8],
          isTouched });
        break;
      }
      if (i === 8) {
        this.setState({ maxPower: '',
          maxRpm: '',
          maxTorque: '',
          rpm: '',
          fuelCapacity: '',
          powertrain: '',
          gearbox: '' });
      }
    }
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
    const nextOdo = R.compose(toMiles(this.state.isMiles), toMeters)(
      this.state.odometer,
    );

    const toSave = Object.assign({}, this.state, {
      fuelCapacity: parseInt(this.state.fuelCapacity, 10),
      year: this.state.year.toString(),
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
      maxPower: {
        max: parseInt(this.state.maxPower, 10),
        rpm: parseInt(this.state.maxRpm, 10),
      },
      maxTorque: {
        max: parseInt(this.state.maxTorque, 10),
        minRpm: extractMinNumber(this.state.rpm),
        maxRpm: extractMaxNumber(this.state.rpm),
      },
    });

    this.props.onSave(toSave, nameChanged, device);
    this.setState({
      isTouched: false,
    });
  };

  onYearChange = (event, index, value) => {
    this.setState(
      {
        year: value,
        isTouched: true,
      },
    );
  }

  onIsMilesChange = (e, isCheked) => {
    this.setState({
      isMiles: isCheked,
      isTouched: true,
    });
  };

  /**
   * Update state[field] with value
   * */
  onChange = (e, value) => {
    const field = e.target.name;

    this.setState({
      [field]: value,
      isTouched: true,
    });
  };

  onKindChange = (e, key, value) => {
    this.setState({
      kind: value,
      isTouched: true,
    });
  };

  onMarkerChange = (e, key, value) => {
    this.setState({
      marker: value,
      isTouched: true,
    });
  };

  onDriverChange = (e, key, value) => {
    this.setState({
      driverId: value,
      isTouched: true,
    });
  };

  /**
   * Update state if another vehicle has been chosen
   * */
  setNewVehicleDetails = (nextProps) => {
    this.setState(setVehicleState(nextProps),
      () => this.calculateOtherFields(false));
  };

  resetChanges = () => {
    this.setState(setVehicleState(this.props));
    this.props.onCancel();
    this.setState({
      isTouched: false,
    });
  };

  updateDeviceId = (deviceId) => {
    this.setState({
      deviceId,
      isTouched: true,
    });
  };

  render() {
    const { translations } = this.props;
    const brand = [];
    const mdlList = [];
    // TODO: no hardcoded limits
    for (let i = 1; i < 10; i++) {
      brand.push(workbook[0].data[i][0]);
      mdlList.push(workbook[0].data[i][1].toString());
    }
    const brandUnique = brand.filter(onlyUnique);
    const modelUnique = mdlList.filter(onlyUnique);
    let curModelUnique = [];

    if (this.state.make === 'Mercedes-Benz') {
      curModelUnique = modelUnique.slice(0, 2);
    }

    if (this.state.make === 'Fuso') {
      curModelUnique = modelUnique.slice(2, modelUnique.length);
    }
    return (
      <div className={styles.details}>
        <Layout.Section>
          <Layout.Header label={translations.parameters} />
          <Layout.Content style={{ flexDirection: 'row' }}>
            <div className={styles.contentLeft}>
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
                style={{ height: 80 }}
              />

              <TextField
                fullWidth
                name="licensePlate"
                onChange={this.onChange}
                floatingLabelText={translations.license_plate}
                value={this.state.licensePlate}
                style={{ height: 80 }}
              />

              <DeviceEditor
                // vehicleId={this.props.details.id}
                deviceId={this.state.deviceId}
                updateDeviceId={this.updateDeviceId}
                style={{ height: 80 }}
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

              {/* <TextField
                fullWidth
                name="fuelCapacity"
                onChange={this.onChange}
                floatingLabelText={translations.fuel_capacity}
                value={this.state.fuelCapacity}
                type="number"
              /> */}

              <DriverSelector
                driverId={this.state.driverId}
                onChange={this.onDriverChange}
              />

              <MarkerSelector
                kind={this.state.marker}
                onChange={this.onMarkerChange}
              />
            </div>
            <div className={styles.contentRight}>
              <SelectField
                value={this.state.year}
                onChange={this.onYearChange}
                floatingLabelText={translations.year_of_manufacture}
              >
                {
                  yearmanufacture.map((value, i) => <MenuItem value={value} key={i} primaryText={value} />)
                }
              </SelectField><br />
              <SelectField
                value={this.state.make}
                onChange={this.brandChange}
                floatingLabelText="Brand"
                style={{ width: 170 }}
              >
                {brandUnique.map(i => <MenuItem value={i} key={i} primaryText={i} />)}
              </SelectField><br />
              {/* value={this.state.model} */}

              <SelectField
                value={this.state.model}
                onChange={this.modelChange}
                floatingLabelText="Model"
                style={{ width: 170 }}
              >
                {curModelUnique.map(i => <MenuItem value={i} key={i} primaryText={i} />)}
              </SelectField>
              <div />
              <TextField
                fullWidth
                name="max_power_hp"
                floatingLabelText={translations.max_power_hp}
                value={this.state.maxPower}
                style={{ width: '50%' }}
              />
              <TextField
                fullWidth
                name="rpm_max"
                floatingLabelText={translations.rpm_max}
                value={this.state.maxRpm}
                style={{ width: '50%' }}
              />
              <TextField
                fullWidth
                name="torque_nm"
                floatingLabelText={translations.torque_nm}
                value={this.state.maxTorque}
                style={{ width: '50%' }}
              />
              <TextField
                fullWidth
                name="rpm"
                floatingLabelText={translations.rpm}
                value={this.state.rpm}
                style={{ width: '50%' }}
              />
              <TextField
                fullWidth
                name="tank_size_litres"
                floatingLabelText={translations.tank_size_litres}
                value={this.state.fuelCapacity}
                style={{ width: '50%' }}
              />
              <TextField
                fullWidth
                name="power_tran"
                floatingLabelText={translations.power_tran}
                value={this.state.powertrain}
                style={{ width: '50%' }}
              />
              <TextField
                fullWidth
                name="gearbox"
                floatingLabelText={translations.gearbox}
                value={this.state.gearbox}
              />
            </div>
          </Layout.Content>
          <FormButtons
            onSubmit={this.onSubmit}
            onCancel={this.resetChanges}
            cancelLabel={translations.reset}
            isDisabled={!this.state.isTouched}
          />
        </Layout.Section>
        {/* no alerts for DEALER for now */}
        {/* <VehicleAlerts vehicleId={this.props.details.id} /> */}
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
