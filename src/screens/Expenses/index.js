import React from 'react';

// import PortalReports from 'containers/Report';

// export default PortalReports;
import PropTypes from 'prop-types';

import pure from 'recompose/pure';
import { connect } from 'react-redux';
import moment from 'moment';

import { DateRange } from 'components/DateRange';
// import TimeFrameController from './components/TimeFrameSelector';
import BetaLabel from 'components/BetaLabel';

import Layout from 'components/Layout';
import VehiclesList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import SoloReport from './components/SoloReport';
import NoPrint from './components/NoPrint';

// import { makeDefaultDatePeriod } from 'utils/dateTimeUtils';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';

import { setExecTimeFrame } from './services/actions';
import { getExecTimeFrame } from './services/reducer';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import listTypes from 'components/InstancesList/types';

class ExecReport extends React.Component {

  onTimeFrameChange = (fromDateTime, toDateTime) => {
    this.props.setExecTimeFrame(fromDateTime, toDateTime);
  }

  setStartDate = (date) => {
    this.props.setExecTimeFrame(date, moment(date).add(1, 'days').toDate());
  }

  render() {
    if (this.props.vehicles.length === 0) {
      return null;
    }
    const dateFrom = this.props.execFrame.dateFrom;
    const dateTo = this.props.execFrame.dateTo;
    return (
      <Layout.ScreenWithList>
        <PowerList
          scrollable
          filter={
            <Filter filterFunc={this.props.filterFunc} />
            }
          content={
            <VehiclesList
              data={this.props.vehicles}
              currentExpandedItemId={this.props.selectedVehicleId}
              type={listTypes.vehicleExecReport}
            />
            }
        />
        <Layout.FixedContent>
          <BetaLabel />
        </Layout.FixedContent>
      </Layout.ScreenWithList>
    );
  }
}

ExecReport.propTypes = {
  vehicles: PropTypes.array.isRequired,
  selectedVehicleId: PropTypes.string.isRequired,

  filterFunc: PropTypes.func.isRequired,
  setExecTimeFrame: PropTypes.func.isRequired,
  execFrame: PropTypes.object.isRequired,
};

const mapState = state => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),
  execFrame: getExecTimeFrame(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
  setExecTimeFrame,
};

export default connect(mapState, mapDispatch)(pure(ExecReport));
