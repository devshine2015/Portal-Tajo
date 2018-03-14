import React from 'react';

import PropTypes from 'prop-types';

import pure from 'recompose/pure';
import { connect } from 'react-redux';
import moment from 'moment';
import Book from 'utils/reports/spreadsheetGenerator';
import { vehiclesActions } from 'services/FleetModel/actions';
import { conditionsActions } from 'services/AlertsSystem/actions';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import {
  getVehicleAlertConditions,
  getAlertConditionByIdFunc,
  getAlertConditions,
} from 'services/AlertsSystem/reducer';

import { TextField } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import Layout from 'components/Layout';
import FixedContent from 'components/FixedContent';
import VehicleSummary from 'components/VehicleSummary/VehicleSummary';
import MainActionButton from 'components/Controls/MainActionButton';

import AnimatedLogo from 'components/animated';
import ServiceHistoryTable from './ServiceHistoryTable';
import BarIndicator from './MaintenaceProgressBar';
import WarningLights from './WarningLights';


class VehicleMaintenance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      isLoading: true,
      serviceDate: new Date(),
      serviceOdometer: 0,
      serviceOdometerTotal: 0,
      serviceNote: '',
    };
    this.maintenanceAlert = null;
    if (props.theVehicle !== null) {
      this.fetchAlerts(props.theVehicle.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theVehicle === null) return;
    if (this.props.theVehicle === null ||
      this.props.theVehicle.id !== nextProps.theVehicle.id) {
      const vehAlertIds = nextProps.getVehicleAlerts(nextProps.theVehicle.id);
      if (vehAlertIds === null) {
        this.setState({ isLoading: true });
        this.fetchAlerts(nextProps.theVehicle.id);
        this.fetchServiceHistory(nextProps.theVehicle.id);
      } else {
        this.setVehicleAlerts(vehAlertIds);
      }
    }
    this.setState({
      serviceOdometer: (nextProps.theVehicle.dist.total / 1000).toFixed(0.1) -
        nextProps.theVehicle.lastServiceOdo,
      serviceOdometerTotal: nextProps.theVehicle.lastServiceOdo,
    });
  }

  fetchServiceHistory = (vehicleId) => {
    this.props.fetchServiceOdoHistory(vehicleId);
  }

  fetchAlerts = (vehicleId) => {
    // this.props.updateLocalVehicleDetails(vehicleId, makeMaintenanceData());
    this.props.fetchVehicleAlertConditions(vehicleId)
      .then(() => {
        this.setVehicleAlerts(this.props.getVehicleAlerts(vehicleId));
      });
  }

  setVehicleAlerts = (alertsSrc) => {
    this.maintenanceAlert = alertsSrc.map(alertId => (this.props.alertById(alertId)))
    // check for null - the alert condition might be not loaded yet
      .find(alrt => alrt !== null && alrt.kind === alertKinds._ALERT_KIND_ODO);

    this.setState({
      isLoading: false,
    });

    // this.props.updateLocalVehicleDetails(this.props.theVehicle.id, makeMaintenanceData());
  }

  handleDateSelect = (_, date) => {
    this.setState({
      serviceDate: date,
    });
  }

  handleOdometerChange = (e) => {
    const numbers = /^[0-9]+$/;
    if (e.target.value === '' || numbers.test(e.target.value)) {
      this.setState({
        serviceOdometer: e.target.value,
      });
    }
    if (this.state.error !== '') {
      this.setState({
        error: '',
      });
    }
  }

  handleNoteChange = (e) => {
    this.setState({
      serviceNote: e.target.value,
    });
  }

  serviceDoneClick = () => {
    const vehicleId = this.props.theVehicle.id;
    const totalDist = parseInt((this.props.theVehicle.dist.total / 1000).toFixed(0.1), 10);
    const newOdoValue = parseInt(this.state.serviceOdometer, 10);
    const totalOdoValue = this.state.serviceOdometerTotal + newOdoValue;
    const time = moment(this.state.serviceDate).format();
    const ts = time.replace(/:([^:]*)$/, '$1');
    if (totalDist < totalOdoValue) {
      this.setState({
        error: "This value can't be bigger than current ODO",
      });
      return;
    }
    this.setState({
      serviceOdometerTotal: totalOdoValue,
    });
    const odometer = {
      odometer: {
        ts,
        value: totalOdoValue,
        note: this.state.serviceNote,
      },
    };
    const original = {
      ...this.props.theVehicle.original,
      lastServiceOdo: {
        value: totalOdoValue,
      },
    };
    this.props.addServiceOdoHistory(vehicleId, odometer);
    this.props.updateServiceOdoHistory({
      id: vehicleId,
      odometerValue: totalOdoValue,
      original,
    });
  }

  doPrint = () => {
    window.print();
  }

  generateServiceData = entries => [
    entries.map(aEntr => [
      moment(aEntr[1].odometer.ts).format('DD-MM-YYYY'),
      aEntr[1].odometer.value,
      aEntr[1].odometer.note,
    ]),
  ]

  doSaveSpreadSheet = () => {
    const overviewEntries = Object.entries(this.props.serviceHistory);
    const book = new Book(
      ['Date', 'Odometer Value (km)', 'Notes'],
      this.generateServiceData(overviewEntries),
      { fileName: 'service_history' },
    );
    book.createBookWithRows();
  }

  render() {
    if (this.props.theVehicle === null) {
      return false;
    }
    if (this.state.isLoading) {
      // const animation = `transition.flipX${(isFetching ? 'In' : 'Out')}`;      
      // animation={animation}
      return (
        <FixedContent
          style={{
            padding: 0,
            height: '400px',
            backgroundColor: 'white',
          }}
        >
          <AnimatedLogo.FullscreenLogo />
        </FixedContent>
      );
    }
    // if no maintanence alert attached - default to 25k
    const mnyCycle = this.maintenanceAlert != null ? this.maintenanceAlert.odoValue : 25000;
    const mntZero = this.props.theVehicle.lastServiceOdo;
    const mntEnd = this.props.theVehicle.lastServiceOdo + mnyCycle;
    const vehCurrent = this.props.theVehicle.dist.total / 1000;
    // debugger;
    const distToNextService = mntEnd - vehCurrent;
    const useDemoRandomData = false;
    return (
      <FixedContent
        style={{
          padding: 0,
        }}
      >
        <VehicleSummary theVehicle={this.props.theVehicle} />
        {/* <BetaLabel /> */}
        <Layout.Section style={{ padding: '32px' }}>
          <BarIndicator
            title={`Next Service ${(distToNextService > 0) ?
              `in ${distToNextService.toFixed(0.1)}km` : `${(-distToNextService).toFixed(0.1)}km overdue`}`}
            zeroValue={mntZero}
            endValue={mntEnd}
            currentValue={vehCurrent}
            showRestValue
            units={'km'}
          />
        </Layout.Section>
        <Layout.Section style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BarIndicator
              style={{ flex: '1', paddingRight: '20px' }}
              title={'Brake Wear'}
              currentValue={useDemoRandomData ? Math.random() * 100 : 0}
            />
            <BarIndicator
              style={{ flex: '1', paddingLeft: '20px' }}
              title={'Exhaust Brake'}
              currentValue={useDemoRandomData ? Math.random() * 100 : 0}
            />

          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BarIndicator
              style={{ flex: '1', paddingRight: '20px' }}
              title={'Clutch Wear'}
              currentValue={useDemoRandomData ? Math.random() * 100 : 0}
            />
            <WarningLights style={{ flex: '1', paddingLeft: '12px' }} />
          </div>
        </Layout.Section>
        <Layout.Section style={{ flexDirection: 'column', padding: '32px' }}>
          <div style={{ flexDirection: 'row' }}>
            <div style={{ display: 'inline-block', marginRight: '40px', verticalAlign: 'top', width: '256px' }}>
              <DatePicker
                autoOk
                defaultDate={this.state.serviceDate}
                floatingLabelText="Date of service"
                maxDate={new Date()}
                onChange={this.handleDateSelect}
              />
            </div>
            <TextField
              floatingLabelFixed
              floatingLabelText="Odometer value (km)"
              name="serviceOdometer"
              value={this.state.serviceOdometer}
              onChange={this.handleOdometerChange}
              errorText={this.state.error}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ marginRight: '24px', width: '556px' }}>
              <TextField
                floatingLabelFixed
                floatingLabelText="Notes about service"
                fullWidth
                rows={3}
                name="serviceNote"
                multiLine
                value={this.state.serviceNote}
                onChange={this.handleNoteChange}
              />
            </div>
            <MainActionButton
              label="Service Done"
              onClick={this.serviceDoneClick}
              icon={null}
              disabled={
                this.state.serviceOdometer === '' ||
                parseInt(this.state.serviceOdometer, 10) === 0
              }
            />
          </div>
        </Layout.Section>
        {
          this.props.serviceHistory.length !== 0 ? (
            <Layout.Section style={{ padding: '40px 32px' }}>
              <ServiceHistoryTable history={this.props.serviceHistory} />
              <div style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: '32px' }}>
                <MainActionButton
                  label="Save RAW"
                  onClick={this.doSaveSpreadSheet}
                  icon={null}
                  style={{ marginLeft: '32px' }}
                />
                <MainActionButton
                  label="Print"
                  onClick={this.doPrint}
                  icon={null}
                />
              </div>
            </Layout.Section>
          ) : null
        }
      </FixedContent>
    );
  }
}
VehicleMaintenance.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

VehicleMaintenance.propTypes = {
  theVehicle: PropTypes.object,
  serviceHistory: PropTypes.array,
  addServiceOdoHistory: PropTypes.func.isRequired,
  updateServiceOdoHistory: PropTypes.func.isRequired,
  getVehicleAlerts: PropTypes.func.isRequired,
  fetchVehicleAlertConditions: PropTypes.func.isRequired,
  fetchServiceOdoHistory: PropTypes.func.isRequired,
  updateLocalVehicleDetails: PropTypes.func.isRequired,
  alertById: PropTypes.func.isRequired,
  alertConditions: PropTypes.array.isRequired,
};
// TODO: REWRITE IN A BETTER WAY (WITHOUT DIRECT GETTING STATE)
const mapState = (state, props) => {
  const vehicleHistory = props.theVehicle !== null ?
    state.toJS().fleet.vehicles.dynamic.processedList[props.theVehicle.id].serviceHistory
    : null;

  return {
    getVehicleAlerts: getVehicleAlertConditions(state),
    alertById: getAlertConditionByIdFunc(state),
    alertConditions: getAlertConditions(state),
    serviceHistory: vehicleHistory,
  };
};
const mapDispatch = {
  fetchVehicleAlertConditions: conditionsActions.fetchVehicleAlertConditions,
  updateLocalVehicleDetails: vehiclesActions.updateLocalDetails,
  fetchServiceOdoHistory: vehiclesActions.fetchServiceOdoHistory,
  addServiceOdoHistory: vehiclesActions.createServiceOdo,
  updateServiceOdoHistory: vehiclesActions.updateLastVehicleOdo,
};

export default connect(mapState, mapDispatch)(pure(VehicleMaintenance));
