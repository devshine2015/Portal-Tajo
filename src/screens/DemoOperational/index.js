import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from 'components/Layout';
import DemoPowerList from 'components/DemoPowerList';
import TheMap from 'containers/Map/MapContainer';
import FixedContent from 'components/FixedContent';
import RouteFinder from 'containers/Map/OnMapElements/MapRoute/RouteFinder';
import NearestFinder from 'containers/Map/OnMapElements/MapRoute/NearestFinder';
import RoutePath from 'containers/Map/OnMapElements/MapRoute/RoutePath';
import CtxtOpenGoogleMap from 'containers/Map/OnMapElements/CtxtMenuOpenGMap';
import GFEditor from 'containers/GFEditor/GFEditor';
import GFEditorMapComponent from 'containers/GFEditor/MapComponenet';
import markerTypes from 'services/FleetModel/utils/markerTypes';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { socketActions, localTickActions } from 'services/FleetModel/actions';
import { gfEditIsEditing } from 'containers/GFEditor/reducer';
import { mapVehicleMarkerMaker } from 'containers/Map/OnMapElements/MapVehicle';
import { mapVehicleNameMaker } from 'containers/Map/OnMapElements/VehicleNameMarker';
import { mapGFMarkerMaker } from 'containers/Map/OnMapElements/MapGF';
import { mapMWAJobMarkerMaker } from 'containers/Map/OnMapElements/MWAJobMarker';
import { getMWAJobs } from 'services/MWA/reducer';
import OperationalList from './components/OperationalPowerList';


import styles from './styles.css';

class DemoOperational extends React.Component {
  componentDidMount() {
    if (this.props.vehicles.length > 0 && !socketActions.isSocketOpened()) {
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

  render() {
    const mapGFs = this.props.gfs.map(mapGFMarkerMaker);
    const mapVehiclesIcons = this.props.vehicles.filter(v => v.marker === markerTypes.Icon).map(mapVehicleMarkerMaker);
    const mapVehicles = this.props.vehicles.filter(v => v.marker === markerTypes.NameLabel).map(mapVehicleNameMaker);
    const mwaJobs = this.props.mwaJobs.map(mapMWAJobMarkerMaker);
    return (
      <Layout.ScreenWithList>
        <DemoPowerList>
          {this.props.isEditGF ?
            <GFEditor /> :
            <OperationalList
              gfs={this.props.gfs}
              vehicles={this.props.vehicles}
            />
          }
        </DemoPowerList>
        <FixedContent containerClassName={styles.fixedContent}>
          <div className={styles.row}>
            <TheMap>
              {mwaJobs}
              {mapGFs}
              {mapVehicles}
              {mapVehiclesIcons}
              <RouteFinder />
              <NearestFinder />
              <RoutePath />
              <GFEditorMapComponent />
              <CtxtOpenGoogleMap />
            </TheMap>
          </div>
        </FixedContent>
      </Layout.ScreenWithList>
    );
  }
}

DemoOperational.propTypes = {
  vehicles: PropTypes.array.isRequired,
  gfs: PropTypes.array.isRequired,
  mwaJobs: PropTypes.array.isRequired,
  isEditGF: PropTypes.bool.isRequired,

  openFleetSocket: PropTypes.func.isRequired,
  startLocalTick: PropTypes.func.isRequired,
};

const mapState = state => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  gfs: fromFleetReducer.getGFsExSorted(state),
  mwaJobs: getMWAJobs(state),
  isEditGF: gfEditIsEditing(state),
});
const mapDispatch = {
  openFleetSocket: socketActions.openFleetSocket,
  startLocalTick: localTickActions.startLocalTick,
};


export default connect(mapState, mapDispatch)(DemoOperational);
