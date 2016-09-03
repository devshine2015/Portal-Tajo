import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import VehiclesList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import FixedContent from 'components/FixedContent';
import TimeFrameController from './components/TimeFrameSelector'
import PlaybackController from './components/PlaybackController'
import ChronicleMap from 'containers/MapFleet/chronicle';
import createEventDispatcher from 'utils/eventDispatcher';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';
import { vehiclesActions } from 'services/FleetModel/actions';
import { showSnackbar } from 'containers/Snackbar/actions';

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
    }
  }

  render() {
    if (this.props.vehicles.length === 0) {
      return null;
    }

    return (
      <div className={styles.editor}>

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
            />
          }
        />
        <FixedContent >
        <TimeFrameController selectedVehicleId={this.state.selectedVehicleId} />
        <PlaybackController />
        <ChronicleMap
          gfEditMode={false}
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
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
  showSnackbar,
};

const PureChronicle = pure(Chronicle);

export default connect(mapState, mapDispatch)(PureChronicle);
