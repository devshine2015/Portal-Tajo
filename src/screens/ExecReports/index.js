// import PortalReports from 'containers/Report';

// export default PortalReports;
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import moment from 'moment';

import DateRange from 'components/DateRange/DateRange';
// import TimeFrameController from './components/TimeFrameSelector';
import BetaLabel from 'components/BetaLabel';

import Layout from 'components/Layout';
import VehiclesList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import SoloReport from './components/SoloReport';

import { makeDefaultDatePeriod } from 'utils/dateTimeUtils';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';

import { setExecTimeFrame } from './services/actions';
import { getExecTimeFrame } from './services/reducer';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import listTypes from 'components/InstancesList/types';

class ExecReport extends React.Component {

  state = {
    ...makeDefaultDatePeriod(),
  };

  onStartDateChange = (_, value) => {
    this.onPeriodChange('startDate', value);
  }

  onEndDateChange = (_, value) => {
    this.onPeriodChange('endDate', value);
  }

  onStartTimeChange = (_, value) => {
    this.onPeriodChange('startTime', value);
  }

  onEndTimeChange = (_, value) => {
    this.onPeriodChange('endTime', value);
  }

  onPeriodChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  setStartDate = (date) => {
    this.props.setExecTimeFrame(date, moment(date).add(1, 'days').toDate());
  }

  render() {
    if (this.props.vehicles.length === 0) {
      return null;
    }
    const dateFrom = this.props.execFrame.dateFrom;
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
          {/*<TimeFrameController dateValue={dateFrom} onChange={this.setStartDate} />*/}
          <DateRange
            onStartDateChange={this.onStartDateChange}
            onStartTimeChange={this.onStartTimeChange}
            onEndDateChange={this.onEndDateChange}
            onEndTimeChange={this.onEndTimeChange}
            defaultStartDate={this.state.startDate}
            defaultEndDate={this.state.endDate}
            defaultStartTime={this.state.startTime}
            defaultEndTime={this.state.endTime}
            withTime
          />
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
