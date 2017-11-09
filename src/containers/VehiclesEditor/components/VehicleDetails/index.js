import React from "react";
import pure from "recompose/pure";
import R from "ramda";
import PropTypes from "prop-types";
import { TextField, Checkbox } from "material-ui";
import { translate, makePhrasesShape } from "utils/i18n";
import Layout from "components/Layout";
import FormButtons from "components/Controls/FormButtons";
import { isDealer } from "configs";

import DeviceEditor from "../DeviceEditor";
import VehicleAlerts from "../VehicleAlerts";
import VehicleKindSelector from "../VehicleKindSelector";
import MarkerSelector from "../MarkerSelector/MarkerSelector";
import DriverSelector from "../DriverSelector/DriverSelector";
import styles from "./styles.css";
import phrases, { detailsShape } from "./PropTypes";
import workbook from "./Truck.xlsx";
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import $ from "jquery";

// TODO: use permissions for ODO editing
// const canShowDevicesManager = () => authorizeWithPermissions('view:devices_manager');

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function containsAll(needles, haystack) {
  for (var i = 0, len = needles.length; i < len; i++) {
    if ($.inArray(needles[i], haystack) == -1) return false;
  }
  return true;
}

function setVehicleState(props) {
  return Object.assign({}, props.details, {
    deviceId: props.details.deviceId || "",
    isMiles: false,
    marker: props.details.marker,
    driverId: props.details.driverId,
    isTouched: false,
    manufacturerValue: 2017,
    brandValue: "Mercedes-Benz",
    modelValue: 3340,
    maxPower: "400",
    maxrpm: "1,800 rpm",
    maxTorque: "1,850 rpm",
    rpm: "1,850 rpm",
    tankSize: "550 liters",
    PowerTrain: "6x4",
    gearbox: "S"
  });
}

function checkIfDeviceChanged(state, props) {
  return state.deviceId !== props.details.deviceId;
}

const toMiles = needConvertToMiles => kms => {
  const odo = needConvertToMiles ? kms * 1.60934 : kms;

  return parseInt(odo, 10);
};
const toMeters = val => val * 1000;

var yearmanufacture = [];

function feedYearManufacture() {
  var d = new Date();
  var curYear = d.getFullYear();
  for (var i = 0; i < 3; i++) {
    yearmanufacture.push(curYear - i);    
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
    this.brandChange = this.brandChange.bind(this);
    this.modelChange = this.modelChange.bind(this);
    this.manufacuterchange = this.manufacuterchange.bind(this);
    this.calculateOtherFields = this.calculateOtherFields.bind(this);

    this.calculateOtherFields();
  }

  manufacuterchange(event, index, value) {
    this.setState(
      {
        manufacturerValue: value
      }
    );
  }
  brandChange(event, index, value) {        
    
    if(this.state.brandValue != value) {
      console.log(value);
      if(value === 'Fuso') {
        this.state.modelValue = 'FJ1823';
      }      
      if(value === 'Mercedes-Benz') {
        this.state.modelValue = 3340;
      }
    }

    this.setState(
      {
        brandValue: value                
      },
      function() {
        this.calculateOtherFields();
      }
    );    
  }
  modelChange(event, index, value) {
    this.setState(
      {
        modelValue: value
      },
      function() {
        this.calculateOtherFields();
      }
    );
  }
  calculateOtherFields() {
    for (var i = 1; i < 10; i++) {
      if (
        containsAll(
          [this.state.brandValue, this.state.modelValue],
          workbook[0].data[i]
        )
      ) {
        this.setState({ maxPower: workbook[0].data[i][2] });
        this.setState({ maxrpm: workbook[0].data[i][3] });
        this.setState({ maxTorque: workbook[0].data[i][4] });
        this.setState({ rpm: workbook[0].data[i][5] });
        this.setState({ tankSize: workbook[0].data[i][6] });
        this.setState({ PowerTrain: workbook[0].data[i][7] });
        this.setState({ gearbox: workbook[0].data[i][8] });
        break;
      }
      if (i === 8) {
        this.setState({ maxPower: "" });
        this.setState({ maxrpm: "" });
        this.setState({ maxTorque: "" });
        this.setState({ rpm: "" });
        this.setState({ tankSize: "" });
        this.setState({ PowerTrain: "" });
        this.setState({ gearbox: "" });
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
  onSubmit = e => {
    e.preventDefault();
    const nameChanged = this.state.name !== this.props.details.name;
    const deviceChanged = checkIfDeviceChanged(this.state, this.props);

    const device = {
      needDetach: !!this.props.details.deviceId && deviceChanged,
      needAttach: !!this.state.deviceId && deviceChanged
    };

    // backend expecting to receive meters
    const nextOdo = R.compose(toMiles(this.state.isMiles), toMeters)(
      this.state.odometer
    );

    const toSave = Object.assign({}, this.state, {
      fuelCapacity: parseInt(this.state.fuelCapacity, 10),
      odometer: {
        value: nextOdo
      },
      lastServiceOdo: {
        value: parseInt(this.state.lastServiceOdo, 10)
      },
      meta: {
        marker: this.state.marker,
        driverId: this.state.driverId
      }
    });

    this.props.onSave(toSave, nameChanged, device);
    this.setState({
      isTouched: false
    });
  };

  onIsMilesChange = (e, isCheked) => {
    this.setState({
      isMiles: isCheked,
      isTouched: true
    });
  };

  /**
   * Update state[field] with value
   * */
  onChange = (e, value) => {
    const field = e.target.name;

    this.setState({
      [field]: value,
      isTouched: true
    });
  };

  onKindChange = (e, key, value) => {
    this.setState({
      kind: value,
      isTouched: true
    });
  };

  onMarkerChange = (e, key, value) => {
    this.setState({
      marker: value,
      isTouched: true
    });
  };

  onDriverChange = (e, key, value) => {
    this.setState({
      driverId: value,
      isTouched: true
    });
  };

  /**
   * Update state if another vehicle has been chosen
   * */
  setNewVehicleDetails = nextProps => {
    this.setState(setVehicleState(nextProps));
  };

  resetChanges = () => {
    this.setState(setVehicleState(this.props));
    this.props.onCancel();
    this.setState({
      isTouched: false
    });
  };

  updateDeviceId = deviceId => {
    this.setState({
      deviceId,
      isTouched: true
    });
  };
  
  render() {        
    const { translations } = this.props;
    var brand = [];
    var model = [];
    for (var i = 1; i < 10; i++) {
      brand.push(workbook[0].data[i][0]);
      model.push(workbook[0].data[i][1]);
    }
    var brand_unique = brand.filter(onlyUnique);
    var model_unique = model.filter(onlyUnique);
    var cur_model_unique = [];    

    if(this.state.brandValue === 'Mercedes-Benz') {
      cur_model_unique = model_unique.slice(0, 2);      
    } 
    
    if(this.state.brandValue === 'Fuso') {
      cur_model_unique = model_unique.slice(2, model_unique.length);            
    }    

    var divStyle = {
      width: "100%",
      overflowY: "auto"
    };
    var parameterDiv = {
      float: "left",
      width: " 50%"
    };
    return (
      <div className={styles.details}>
        <Layout.Section>
          <Layout.Header label={translations.parameters} />
          <Layout.Content>
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
                value={this.state.manufacturerValue}
                onChange={this.manufacuterchange}
                floatingLabelText="Year of Manufacturer"
              >
                {
                  yearmanufacture.map((value,i) => {
                    return <MenuItem value={value} key={i} primaryText={value} />;
                  })
                }                
              </SelectField><br/>
              <SelectField
                value={this.state.brandValue}
                onChange={this.brandChange}
                floatingLabelText="Brand"
                style={{
                  top: -12,
                  width: 170
                }}
              >
                {brand_unique.map(i => {
                  return <MenuItem value={i} key={i} primaryText={i} />;
                })}
              </SelectField><br/>
              <SelectField
                value={this.state.modelValue}
                onChange={this.modelChange}
                floatingLabelText="Modal"
                style={{
                  top: -12,
                  width: 170
                }}
              >
                {cur_model_unique.map(i => {
                  return <MenuItem value={i} key={i} primaryText={i} />;
                })}
              </SelectField><br/>
              <TextField
                fullWidth
                name="max_power_hp"
                floatingLabelText={translations.max_power_hp}
                value={this.state.maxPower}
                style={{ width: "50%" }}
              />
              <TextField
                fullWidth
                name="rpm_max"
                floatingLabelText={translations.rpm_max}
                value={this.state.maxrpm}
                style={{ width: "50%" }}
              />
              <TextField
                fullWidth
                name="torque_nm"
                floatingLabelText={translations.torque_nm}
                value={this.state.maxTorque}
                style={{ width: "50%" }}
              />
              <TextField
                fullWidth
                name="rpm"
                floatingLabelText={translations.rpm}
                value={this.state.rpm}
                style={{ width: "50%" }}
              />
              <TextField
                fullWidth
                name="tank_size_litres"
                floatingLabelText={translations.tank_size_litres}
                value={this.state.tankSize}
                style={{ width: "250px" }}
              />
              <TextField
                fullWidth
                name="power_tran"
                floatingLabelText={translations.power_tran}
                value={this.state.PowerTrain}
                style={{ width: "250px" }}
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
        <VehicleAlerts vehicleId={this.props.details.id} />
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

  translations: makePhrasesShape(phrases).isRequired

  // userPermittedTo: PropTypes.shape({
  //   [permissions.VEHICLE_DISABLE]: PropTypes.bool.isRequired,
  // }),
};

const Translated = translate(phrases)(VehicleDetails);

export default pure(Translated);