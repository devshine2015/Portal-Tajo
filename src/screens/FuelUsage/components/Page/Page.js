import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import moment from 'moment';

import DealerPage, {
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';

import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
// import { getVehiclesExSorted, reducerKey } from 'services/FleetModel/reducers/vehiclesReducer';
// import { vehiclesActions } from 'services/FleetModel/actions';

import { fetchVehicleFuelReport } from './../../services/actions';
import { getFuelReport } from './../../services/reducer';


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
    const timeRange = {
      fromDate: moment().subtract(1, 'days'),
      toDate: moment(),
    };
    this.props.fetchVehicleFuelReport(this.state.selectedVehicleId, timeRange);
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
          <VehicleFuel fuelReport={this.getVehicleFuelReportById(this.state.selectedVehicleId)} theVehicle={this.props.getVehicleById(this.state.selectedVehicleId)} />
        </FixedContent>
      </DealerPage>
    );
  }
}

Page.propTypes = {
  getVehicleById: PropTypes.func.isRequired,
  fetchVehicleFuelReport: PropTypes.func.isRequired,
  getFuelReport: PropTypes.object,
};

Page.defaultProps = {
  getFuelReport: [],
};

// const mapState = state => ({
//   // vehicles: fromFleetReducer.getVehiclesExSorted(state),
//   // selectedVehicleId: ctxGetSelectedVehicleId(state),
//   getVehicleById: getVehicleByIdFunc(state),
//   getFuelReport: getFuelReport(state),
// });

function mapState(state) {
  console.log(state);
  return {
    // listData: state.fuelUseage,
    getVehicleById: getVehicleByIdFunc(state),
    getFuelReport: getFuelReport(state),
  };
}

const mapDispatch = {
  fetchVehicleFuelReport,
};

export default connect(mapState, mapDispatch)(pure(Page));

