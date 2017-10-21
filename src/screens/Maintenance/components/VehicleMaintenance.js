import React from 'react';

// import PortalReports from 'containers/Report';

// export default PortalReports;
import PropTypes from 'prop-types';

import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import { VelocityComponent } from 'velocity-react';

// import TimeFrameController from './components/TimeFrameSelector';
import BetaLabel from 'components/BetaLabel';

import Layout from 'components/Layout';
import FixedContent from 'components/FixedContent';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { conditionsActions } from 'services/AlertsSystem/actions';
import { getVehicleAlertConditions,
  getAlertConditionByIdFunc, getAlertConditions } from 'services/AlertsSystem/reducer';

import AnimatedLogo from 'components/animated';
import BarIndicator from './MaintenaceProgressBar';
import LightIndicator from './LightIndicator';
import classes from './classes';

// import { makeDefaultDatePeriod } from 'utils/dateTimeUtils';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';

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
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theVehicle === null
      || this.state.isLoading !== nextState.isLoading) {
      return true;
    }
    if (this.props.theVehicle.id === nextProps.theVehicle.id) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theVehicle === null) {
      return;
    }
    if (this.props.theVehicle !== nextProps.theVehicle) {
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
    this.props.fetchVehicleAlertConditions(vehicleId)
      .then(() => {
        this.setVehicleAlerts(this.props.getVehicleAlerts(this.props.vehicleId));
      });
  }

  setVehicleAlerts = (alertsSrc) => {
    this.maintenanceAlert = alertsSrc.map(alertId => (this.props.alertById(alertId)))
    // check for null - the alert condition might be not loaded yet
      .find(alrt => alrt !== null && alrt.kind === alertKinds._ALERT_KIND_ODO);

    this.setState({
      isLoading: false,
    });
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

    const headLbl = this.props.theVehicle.original.name;
    // const headLbl = this.state.selectedVehicleId;
    // '6K1577 pajero sport';
    return (
      <FixedContent
        style={{
          padding: 0,
        }}
      >
        <BetaLabel />
        <Layout.Section style={{ padding: '32px' }}>
          <Layout.Header
            label={headLbl}
            style={{ textAlign: 'center', paddingLeft: 0 }}
          />
        </Layout.Section>
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
              title={'Break Warning'}
              status={devRndLightStatus()}
            />
            <LightIndicator
              title={'Engine Temp'}
              status={devRndLightStatus()}
            />
            <LightIndicator
              title={'Oil Preasure'}
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
};


export default connect(mapState, mapDispatch)(pure(VehicleMaintenance));
