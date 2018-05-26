import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import DemoPowerList from 'components/DemoPowerList';
import OperationalList from 'components/OnePowerList';
import PageHeader from 'components/OneDateSelectionRow';

import FixedContent from 'components/DemoFixedContent';
import AnimatedLogo from 'components/animated';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { mapStoreSetPan } from 'containers/Map/reducerAction';
// import dealerSelectors from 'services/Dealer/selectors';
import { changeTimeRange } from 'services/Dealer/actions';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';
import { fetchVehicleFuelReport } from './../../services/actions';
import { getFuelReportForVehicle, getFuelReportLoadingState } from './../../services/reducer';

import VehicleFuel from './../VehicleFuel';
import styles from './../styles.css';

class Page extends React.Component {
  applyTimeRange = (timeRange) => {
    if (this.props.selectedVehicleId !== '') {
      this.setState({ loading: true });
      this.props.fetchVehicleFuelReport(this.props.selectedVehicleId, timeRange);
      this.props.changeTimeRange(timeRange);
    }
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <DemoPowerList>
          <OperationalList
            vehicles={this.props.vehicles}
          />
        </DemoPowerList>
        <FixedContent
          style={{
            padding: 0,
            height: '100%',
            minHeight: '100%',
          }}
        >
          <PageHeader
            text="Fuel Usage"
            onApply={tr => this.applyTimeRange(tr)}
          />
          {(this.props.isLoading) ?
            <AnimatedLogo.FullscreenLogo /> :
            <VehicleFuel theVehicleId={this.props.selectedVehicleId} />
          }
        </FixedContent>
      </div>
    );
  }
}
Page.defaultProps = {
  selectedTimeRange: {},
};

Page.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  mapStoreSetPan: PropTypes.func.isRequired,
  changeTimeRange: PropTypes.func.isRequired,
  fetchVehicleFuelReport: PropTypes.func.isRequired,
  getFuelReportForVehicle: PropTypes.func.isRequired,
  selectedVehicleId: PropTypes.string.isRequired,
};

const mapState = state => ({
  isLoading: getFuelReportLoadingState(state),
  getFuelReportForVehicle: getFuelReportForVehicle(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
});

const mapDispatch = {
  fetchVehicleFuelReport,
  mapStoreSetPan,
  changeTimeRange,
};

export default connect(mapState, mapDispatch)(pure(Page));
