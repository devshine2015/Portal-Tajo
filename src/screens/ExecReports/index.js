// import PortalReports from 'containers/Report';

// export default PortalReports;
import React from 'react';
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
          {/* <TimeFrameController dateValue={dateFrom} onChange={this.setStartDate} />*/}
          <NoPrint
            style={{
              position: 'absolute',
              zIndex: 1,
              width: '100%',
              backgroundColor: 'white',
              borderBottom: 'solid 1px rgba(0, 150, 136, 0.27)',
              paddingLeft: '32px',
              boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, .5)',
            }}
          >
            <DateRange
              onChange={this.onTimeFrameChange}
              fromDate={dateFrom}
              toDate={dateTo}
              withTime
            />
          </NoPrint>
          <SoloReport vehicleId={this.props.selectedVehicleId} />
          <BetaLabel />
        </Layout.FixedContent>
      </Layout.ScreenWithList>
    );
  }
}

ExecReport.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  selectedVehicleId: React.PropTypes.string.isRequired,

  filterFunc: React.PropTypes.func.isRequired,
  setExecTimeFrame: React.PropTypes.func.isRequired,
  execFrame: React.PropTypes.object.isRequired,
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
