import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';

import DealerPage, {
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
// import { getVehiclesExSorted, reducerKey } from 'services/FleetModel/reducers/vehiclesReducer';
// import { vehiclesActions } from 'services/FleetModel/actions';

import { fetchVehicleFuelReport } from './../../services/actions';
import { getFuelReport, getFuelReportForVehicle } from './../../services/reducer';


import VehicleFuel from './../VehicleFuel';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicleId: '',
    };
  }

  vehicleSelected = (id) => {
    if (id !== this.state.selectedVehicleId) {
      this.setState({ selectedVehicleId: id });
    }
  }

  applyTimeRange = (timeRange) => {
    this.props.fetchVehicleFuelReport(this.state.selectedVehicleId, timeRange);
  }
  componentDidMount() {
    this.props.fetchVehicleFuelReport(this.state.selectedVehicleId, makePeriodForLast24Hours());
  }
  getVehicleFuelReportById = (id) => {
    if (!this.props.getFuelReport.length) {
      return false;
    }
    const selectedReport = this.props.getFuelReport.find(report => report.id === id);
    return selectedReport;
  }
  render() {
    return (
      <DealerPage>
        <PowerList onVehicleSelect={id => this.vehicleSelected(id)} />
        <FixedContent
          style={{
            height: '100%',
          }}
        >
          <PageHeader text="Fuel Usage" onApply={tr => this.applyTimeRange(tr)} />
          <VehicleFuel theVehicle={this.props.getFuelReportForVehicle(this.state.selectedVehicleId)} />
        </FixedContent>
      </DealerPage>
    );
  }
}

Page.propTypes = {
  getVehicleById: PropTypes.func.isRequired,
  fetchVehicleFuelReport: PropTypes.func.isRequired,
  getFuelReport: PropTypes.object,
  getFuelReportForVehicle: PropTypes.func.isRequired,
};

Page.defaultProps = {
  getFuelReport: {},
};

// const mapState = state => ({
//   // vehicles: fromFleetReducer.getVehiclesExSorted(state),
//   // selectedVehicleId: ctxGetSelectedVehicleId(state),
//   getVehicleById: getVehicleByIdFunc(state),
//   getFuelReport: getFuelReport(state),
// });

function mapState(state) {
  return {
    // listData: state.fuelUseage,
    getVehicleById: getVehicleByIdFunc(state),
    getFuelReport: getFuelReport(state),
    getFuelReportForVehicle: getFuelReportForVehicle(state),
  };
}

const mapDispatch = {
  fetchVehicleFuelReport,
};

export default connect(mapState, mapDispatch)(pure(Page));

