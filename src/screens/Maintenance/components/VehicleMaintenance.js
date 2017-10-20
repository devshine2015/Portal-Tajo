import React from 'react';

// import PortalReports from 'containers/Report';

// export default PortalReports;
import PropTypes from 'prop-types';

import pure from 'recompose/pure';
import { connect } from 'react-redux';


// import TimeFrameController from './components/TimeFrameSelector';
import BetaLabel from 'components/BetaLabel';

import Layout from 'components/Layout';

import BarIndicator from './MaintenaceProgressBar';
import LightIndicator from './LightIndicator';

import FixedContent from 'components/FixedContent';

// import { makeDefaultDatePeriod } from 'utils/dateTimeUtils';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';

class VehicleMaintenance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicleId: '',
    };
  }
  onTimeFrameChange = (fromDateTime, toDateTime) => {
    // this.props.setExecTimeFrame(fromDateTime, toDateTime);
  }

  setStartDate = (date) => {
    // this.props.setExecTimeFrame(date, moment(date).add(1, 'days').toDate());
  }

  vehicleSelected = (id) => {
    this.setState({ selectedVehicleId: id });
  }

  render() {
    if (this.props.theVehicle === null) {
      return false;
    }

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
            title={'Next Service in 12720km'}
            currentValue={Math.random() * 100}
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
              status={0}
            />
            <LightIndicator
              title={'Break Warning'}
              status={1}
            />
            <LightIndicator
              title={'Engine Temp'}
              status={0}
            />
            <LightIndicator
              title={'Oil Preasure'}
              status={0}
            />
          </div>
        </Layout.Section>
      </FixedContent>
    );
  }
}

VehicleMaintenance.propTypes = {
  theVehicle: PropTypes.object,
  // selectedVehicleId: PropTypes.string.isRequired,

  // filterFunc: PropTypes.func.isRequired,
};

const mapState = state => ({
});
const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(VehicleMaintenance));
