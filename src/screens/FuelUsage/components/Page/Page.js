import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { makePeriodForHoursBack } from 'utils/dateTimeUtils';

import DealerPage, {
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';
import AnimatedLogo from 'components/animated';

import { fetchVehicleFuelReport } from './../../services/actions';
import { getFuelReport } from './../../services/reducer';

import VehicleFuel from './../VehicleFuel';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicleId: '',
      loading: true,
    };
  }

  componentDidMount() {
    // by default - query one month back
    this.applyTimeRange(makePeriodForHoursBack(30 * 24));
  }

  vehicleSelected = (id) => {
    if (id !== this.state.selectedVehicleId) {
      this.setState({ selectedVehicleId: id });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getFuelReport) {
      this.setState({ loading: false });
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
          {(this.state.loading) ?
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
  getFuelReport: PropTypes.object,
};

Page.defaultProps = {
  getFuelReport: {},
};
function mapState(state) {
  return {
    getFuelReport: getFuelReport(state),
  };
}

const mapDispatch = {
  fetchVehicleFuelReport,
};

export default connect(mapState, mapDispatch)(pure(Page));

