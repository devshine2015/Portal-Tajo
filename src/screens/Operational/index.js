import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import PowerList from 'components/PowerList';
import TheMap from 'containers/MapFleet/MapContainer';
import Journal from 'containers/Journal/components/Journal';
import OperationalList from './components/OperationalPowerList';
import FixedContent from 'components/FixedContent';
import RouteFinder from 'containers/MapFleet/components/MapRoute/RouteFinder';
import NearestFinder from 'containers/MapFleet/components/MapRoute/NearestFinder';
import GFEditor from 'containers/GFEditor/GFEditor';
import GFEditorMapComponent from 'containers/GFEditor/MapComponenet';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { socketActions, localTickActions } from 'services/FleetModel/actions';
import { gfEditIsEditing } from 'containers/GFEditor/reducer';

import { mapVehicleMarkerMaker } from 'containers/MapFleet/components/MapVehicle';
import { mapGFMarkerMaker } from 'containers/MapFleet/components/MapGF';
import { mapMWAJobMarkerMaker } from 'containers/MapFleet/components/MWAJobMarker';

import { getMWAJobs } from 'services/MWA/reducer';

import styles from './styles.css';

class Operational extends React.Component {

  componentDidMount() {
    if (this.props.vehicles.length > 0) {
      this.props.openFleetSocket();
      // TODO: move it none layer higher -
      // keep local tick alife all the time - actiual in any screen
      this.props.startLocalTick();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vehicles.length === 0 && nextProps.vehicles.length > 0) {
      this.props.openFleetSocket();
      this.props.startLocalTick();
    }
  }

  componentWillUnmount() {
    socketActions.closeFleetSocket();
    // TODO: keep local tick alife all the time - actiual in any screen
    localTickActions.stopLocalTick();
  }

  render() {
    const mapGFs = this.props.gfs.map(mapGFMarkerMaker);
    const mapVehicles = this.props.vehicles.map(mapVehicleMarkerMaker);
    const mwaJobs = this.props.mwaJobs.map(mapMWAJobMarkerMaker);
    return (
      <div className={styles.mapAndListContainer}>
        <PowerList>
          {this.props.isEditGF ?
            <GFEditor /> :
            <OperationalList
              gfs={this.props.gfs}
              vehicles={this.props.vehicles}
            />
          }
        </PowerList>
        <FixedContent containerClassName={styles.fixedContent}>
          <div className={styles.row}>
            <TheMap >
              {mapVehicles}
              {mapGFs}
              {mwaJobs}
              <RouteFinder />
              <NearestFinder />
              <GFEditorMapComponent />
            </TheMap>
            <Journal />
          </div>
        </FixedContent>
      </div>
    );
  }
}

Operational.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  gfs: React.PropTypes.array.isRequired,
  mwaJobs: React.PropTypes.array.isRequired,
  isEditGF: React.PropTypes.bool.isRequired,

  openFleetSocket: React.PropTypes.func.isRequired,
  startLocalTick: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
  mwaJobs: getMWAJobs(state),
  isEditGF: gfEditIsEditing(state),
});
const mapDispatch = {
  openFleetSocket: socketActions.openFleetSocket,
  startLocalTick: localTickActions.startLocalTick,
};

const PureOperational = pure(Operational);
export default connect(mapState, mapDispatch)(PureOperational);
