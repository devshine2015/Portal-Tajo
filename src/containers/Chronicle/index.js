import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import VehiclesList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import FixedContent from 'components/FixedContent';
import TimeFrameController from './components/TimeFrameSelector';
import ChartTimeBox from './components/ChartTimeBox';
import PlaybackController from './components/PlaybackController';
import ChronicleMap from 'containers/MapFleet/chronicle';
import { CHRONICLE_LOCAL_INCTANCE_STATE_NONE,
  requestHistory } from 'containers/Chronicle/actions';
import { getChronicleTimeFrame } from 'containers/Chronicle/reducer';

import createEventDispatcher from 'utils/eventDispatcher';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';
import { vehiclesActions } from 'services/FleetModel/actions';
import { showSnackbar } from 'containers/Snackbar/actions';
import listTypes from 'components/InstancesList/types';

import styles from './styles.css';

class Chronicle extends React.Component {

  constructor(props) {
    super(props);

    this.eventDispatcher = createEventDispatcher();

    this.state = {
      selectedVehicleId: undefined,
      selectedVehicle: null,
    };

    this.onItemClick = this.onItemClick.bind(this);
  }

  /**
   * Choose vehicle by id
   **/
  onItemClick = (id) => {
    const v = getVehicleById(id, this.props.vehicles);
    if (v !== undefined) {
      this.setState({
        selectedVehicleId: id,
        selectedVehicle: v.vehicle,
      });
      if (v.vehicle.chronicleState === CHRONICLE_LOCAL_INCTANCE_STATE_NONE) {
        const currentTimeFrame = this.props.chronicleTimeFrame;
        this.props.requestHistory(id, currentTimeFrame.fromDate, currentTimeFrame.toDate);
      }
    }
  }

  render() {
    if (this.props.vehicles.length === 0) {
      return null;
    }

    return (
      <div className={styles.topContainer}>

        <PowerList
          scrollable
          filter={
            <Filter filterFunc={this.props.filterFunc} />
          }
          content={
            <VehiclesList
              onItemClick={this.onItemClick}
              data={this.props.vehicles}
              currentExpandedItemId={this.state.selectedVehicleId}
              type={listTypes.vehicleChronicle}
            />
          }
        />
        <FixedContent containerClassName={styles.fixedContent}>
        <TimeFrameController selectedVehicleId={this.state.selectedVehicleId} />
        <ChartTimeBox srcVehicle={this.state.selectedVehicle} />
        <PlaybackController />
        <ChronicleMap
          selectedVehicle={this.state.selectedVehicle}
        />
        </FixedContent>
        </div>
    );
  }
}

Chronicle.propTypes = {
  showSnackbar: React.PropTypes.func.isRequired,
  vehicles: React.PropTypes.array.isRequired,
  filterFunc: React.PropTypes.func.isRequired,
  requestHistory: React.PropTypes.func.isRequired,
  chronicleTimeFrame: React.PropTypes.object.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  chronicleTimeFrame: getChronicleTimeFrame(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
  showSnackbar,
  requestHistory,
};

const PureChronicle = pure(Chronicle);

export default connect(mapState, mapDispatch)(PureChronicle);
