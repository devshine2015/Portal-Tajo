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
// import PowerList from 'components/PowerList';
import Filter from 'components/Filter';

import DealerPage, {
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';

// import { makeDefaultDatePeriod } from 'utils/dateTimeUtils';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import listTypes from 'components/InstancesList/types';

class VehicleMaintenance extends React.Component {
  onTimeFrameChange = (fromDateTime, toDateTime) => {
    // this.props.setExecTimeFrame(fromDateTime, toDateTime);
  }

  setStartDate = (date) => {
    // this.props.setExecTimeFrame(date, moment(date).add(1, 'days').toDate());
  }

  render() {
    return (
      <DealerPage>
        <PowerList onVehicleSelect={() => this.forceUpdate()} />
        <FixedContent
          style={{
            height: '100%',
          }}
        >
          <PageHeader text="Vehicle Maintenance" onApply={() => this.forceUpdate()} />
          <BetaLabel />
        </FixedContent>
      </DealerPage>
    );
  }
}

VehicleMaintenance.propTypes = {
  // vehicles: PropTypes.array.isRequired,
  // selectedVehicleId: PropTypes.string.isRequired,

  // filterFunc: PropTypes.func.isRequired,
};

const mapState = state => ({
  // vehicles: fromFleetReducer.getVehiclesExSorted(state),
  // selectedVehicleId: ctxGetSelectedVehicleId(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
};

export default connect(mapState, mapDispatch)(pure(VehicleMaintenance));
