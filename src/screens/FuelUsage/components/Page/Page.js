import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
// import { makePeriodForHoursBack } from 'utils/dateTimeUtils';

import DealerPage, {
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';
import AnimatedLogo from 'components/animated';
import { mapStoreSetPan } from 'containers/Map/reducerAction';

import { fetchVehicleFuelReport } from './../../services/actions';
import { getFuelReportForVehicle, getFuelReportLoadingState } from './../../services/reducer';

import VehicleFuel from './../VehicleFuel';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicleId: '',
    };
  }

  // componentDidMount() {
  //   // // by default - query one month back
  //   this.applyTimeRange(makePeriodForHoursBack(30 * 24));
  // }

  vehicleSelected = (id) => {
    if (id !== this.state.selectedVehicleId) {
      this.setState({ selectedVehicleId: id });
      // pan the map on the events of selected vehicle
      const selectedFuelReport = this.props.getFuelReportForVehicle(id);
      if (selectedFuelReport !== undefined
      && selectedFuelReport.alerts != null
      && selectedFuelReport.alerts.length > 0) {
        const positions = selectedFuelReport.alerts
          .filter(alrt => alrt.position !== undefined)
          .reduce((points, alrt) => points.concat([[alrt.position.lat, alrt.position.lng]]), []);
        this.props.mapStoreSetPan(positions);
      }
    }
  }
  applyTimeRange = (timeRange) => {
    this.setState({ loading: true });
    this.props.fetchVehicleFuelReport(this.state.selectedVehicleId, timeRange);
  }
  render() {
    return (
      <DealerPage>
        <PowerList onVehicleSelect={id => this.vehicleSelected(id)} />
        <FixedContent
          style={{
            padding: 0,
            height: '100%',
            minHeight: '400px',
            backgroundColor: 'white',
          }}
        >
          <PageHeader text="Fuel Usage" onApply={tr => this.applyTimeRange(tr)} />
          {(this.props.isLoading) ?
            <AnimatedLogo.FullscreenLogo /> :
            <VehicleFuel theVehicleId={this.state.selectedVehicleId} />
          }
        </FixedContent>
      </DealerPage>
    );
  }
}

Page.propTypes = {
  fetchVehicleFuelReport: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getFuelReportForVehicle: PropTypes.func.isRequired,
  mapStoreSetPan: PropTypes.func.isRequired,
};

const mapState = state => ({
  isLoading: getFuelReportLoadingState(state),
  getFuelReportForVehicle: getFuelReportForVehicle(state),
});

const mapDispatch = {
  fetchVehicleFuelReport,
  mapStoreSetPan,
};

export default connect(mapState, mapDispatch)(pure(Page));

