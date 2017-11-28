import React from 'react';

// import PortalReports from 'containers/Report';

// export default PortalReports;
import PropTypes from 'prop-types';

import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { vehiclesActions } from 'services/FleetModel/actions';

// import TimeFrameController from './components/TimeFrameSelector';
// import BetaLabel from 'components/BetaLabel';

import Layout from 'components/Layout';
import FixedContent from 'components/FixedContent';
import VehicleSummary from 'components/VehicleSummary/VehicleSummary';

import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { conditionsActions } from 'services/AlertsSystem/actions';
import { getVehicleAlertConditions,
  getAlertConditionByIdFunc, getAlertConditions } from 'services/AlertsSystem/reducer';

import AnimatedLogo from 'components/animated';
import BarIndicator from './MaintenaceProgressBar';
import LightIndicator from './LightIndicator';

// import { makeMaintenanceData,
//   MaintenanceStatus } from './../utils/maintenanceHelper';

function devRndLightStatus() {
  return (Math.random() < 0.7) ? 0 : 1;
}

class VehicleMaintenance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.maintenanceAlert = null;
    if (props.theVehicle !== null) {
      this.fetchAlerts(props.theVehicle.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theVehicle === null) return;
    if (this.props.theVehicle === null
      || this.props.theVehicle.id !== nextProps.theVehicle.id) {
      const vehAlertIds = nextProps.getVehicleAlerts(nextProps.theVehicle.id);
      if (vehAlertIds === null) {
        this.setState({ isLoading: true });
        this.fetchAlerts(nextProps.theVehicle.id);
      } else {
        this.setVehicleAlerts(vehAlertIds);
      }
    }
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

    const distToNextService = mntEnd - vehCurrent;
    // const toServicePerc = 100 * (vehCurrent - mntZero) / (mntEnd - mntZero);

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
              style={{ flex: '1', paddingRight: '6px' }}
              title={'Brake Wear'}
              currentValue={Math.random() * 100}
            />
            <BarIndicator
              style={{ flex: '1', paddingLeft: '6px' }}
              title={'Exhaust Brake'}
              currentValue={Math.random() * 100}
            />

          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BarIndicator
              style={{ width: '50%', paddingRight: '6px' }}
              title={'Clutch Wear'}
              currentValue={Math.random() * 100}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <LightIndicator
              title={'Engine Trouble'}
              status={devRndLightStatus()}
            />
            <LightIndicator
              title={'Brake Warning'}
              status={devRndLightStatus()}
            />
            <LightIndicator
              title={'Engine Temp'}
              status={devRndLightStatus()}
            />
            <LightIndicator
              title={'Oil Pressure'}
              status={devRndLightStatus()}
            />
          </div>
        </Layout.Section>
      </FixedContent>
    );
  }
}

VehicleMaintenance.propTypes = {
  theVehicle: PropTypes.object,
  getVehicleAlerts: PropTypes.func.isRequired,
  fetchVehicleAlertConditions: PropTypes.func.isRequired,
  updateLocalVehicleDetails: PropTypes.func.isRequired,
  alertById: PropTypes.func.isRequired,
  alertConditions: PropTypes.array.isRequired,
};

const mapState = state => ({
  getVehicleAlerts: getVehicleAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
  alertConditions: getAlertConditions(state),
});
const mapDispatch = {
  fetchVehicleAlertConditions: conditionsActions.fetchVehicleAlertConditions,
  updateLocalVehicleDetails: vehiclesActions.updateLocalDetails,
};


export default connect(mapState, mapDispatch)(pure(VehicleMaintenance));
