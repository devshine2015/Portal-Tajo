import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import Layout from 'components/Layout';
import VehiclesList from 'components/DemoInstancesList';
import PowerList from 'components/DemoPowerList';
import Filter from 'components/DemoFilter';
import FixedContent from 'components/DemoFixedContent';

import TheMap from 'containers/DemoMap/MapContainer';
import ChroniclePath from 'containers/DemoMap/OnMapElements/ChroniclePath';
import ChronicleMarker from 'containers/DemoMap/OnMapElements/ChronicleMarker';
import ChronicleEventMarker from 'containers/DemoMap/OnMapElements/ChronicleEventMarker';
import ChronicleEventStaticPopUp from 'containers/DemoMap/OnMapElements/ChronicleEventStaticPopUp';
import CtxtOpenGoogleMap from 'containers/DemoMap/OnMapElements/CtxtMenuOpenGMap';
import mapMWAJobChronicleMarkerMaker from 'containers/DemoMap/OnMapElements/MWAJobChronicleMarker';

import ChartTimeBox from './components/ChartTimeBox';
import PlaybackController from './components/PlaybackController';

import {
  getChronicleTimeFrame,
  getInstanceChronicleFrameById,
  hasChroniclePlayableFrames,
} from './reducer';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';

import GFEditorMapComponent from 'containers/GFEditor/MapComponenet';

import { gfEditIsEditing } from 'containers/GFEditor/reducer';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import listTypes from 'components/DemoInstancesList/types';
import TripItem from './components/TripItem';

import { requestHistory } from 'screens/DemoChronicle/actions';

import styles from './styles.css';

class DemoChronicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandStopEvents: false,
      selectedTrip: null,
    };
  }

  expandStopsToggle = () => {
    this.setState({
      expandStopEvents: !this.state.expandStopEvents,
    });
  }

  // make all the on-map markers - helpers for render
  makeChronoPath = (v) => {
    const vehCronicleFrame = this.props.getInstanceChronicleFrameById(v.id);
    if (!vehCronicleFrame.isValid() || !vehCronicleFrame.hasPositions()) {
      return false;
    }
    return (
      <ChroniclePath
        key={`${v.id}CrP`}
        chronicleFrame={vehCronicleFrame}
        isSelected={this.props.selectedVehicleId === v.id}
      />
    );
  };
  makeChronoMarker = (v) => {
    const vehCronicleFrame = this.props.getInstanceChronicleFrameById(v.id);
    if (!vehCronicleFrame.isValid() || !vehCronicleFrame.hasPositions()) {
      return false;
    }
    return (
      <ChronicleMarker
        key={`${v.id}CrM`}
        chronicleFrame={vehCronicleFrame}
        isSelected={this.props.selectedVehicleId === v.id}
      />
    );
  }
  makeChronoEventMarker = (v, idx) => (
    <ChronicleEventMarker
      key={`${this.props.selectedVehicleId + idx}CrSt`}
      theLayer={this.theMap}
      chronicleEvent={v}
    />
  );
  makeChronoEventStaticPopups = (v, idx) => (
    <ChronicleEventStaticPopUp
      key={`${this.props.selectedVehicleId + idx}CrSt`}
      theLayer={this.theMap}
      chronicleEvent={v}
    />
  );

  makeChronoMWAMarker = (aJob, idx) => {
    aJob.idx = idx;
    return mapMWAJobChronicleMarkerMaker(aJob);
  }
  onTripClick = (e) => {
    this.setState({
      selectedTrip: e.target.dataset.trip,
    });
  }
  onTripSubmit = (e) => {
    e.preventDefault();

      const currentTimeFrame = this.props.chronicleTimeFrame;
      this.props.requestHistory(this.props.selectedVehicleId, this.state.selectedTrip, currentTimeFrame.fromDate, currentTimeFrame.toDate);
  }

  renderFakeTrips = (id) => {
    if (id === '31cb5062-f316-49b6-b2bd-2317da383299') {
      return (
        <div>
          <TripItem
            selected={this.state.selectedTrip === "trip11"}
            name="trip11"
            tripNumber="1"
            tripDriver="danny worss"
            tripTime="29 minutes"
            handleClick={this.onTripClick}
          />
          <TripItem
            selected={this.state.selectedTrip === "trip12"}
            name="trip12"
            tripNumber="2"
            tripDriver="danny worss"
            tripTime="1.25 hours"
            handleClick={this.onTripClick}
          />
        </div>
      )
    } else if (id === '5a2b6ecc-43d1-4ed7-97a6-0e86bf3eaf95') {
      return (
        <TripItem
          selected={this.state.selectedTrip === "trip21"}
          name="trip21"
          tripNumber="1"
          tripDriver="brent smith"
          tripTime="1 hour"
          handleClick={this.onTripClick}
        />
      )
    } else if (id === 'c5081aec-9982-4423-9eea-894b4a9ac9e7') {
      return (
        <div className={styles.emptyNote}>No trips yet</div>
      )
    }
    return (
      <div className={styles.emptyNote}>No vehicle selected</div>
    )
  }

  render() {
    if (this.props.vehicles.length === 0) {
      return null;
    }
    const chronicleFrame = this.props.getInstanceChronicleFrameById(this.props.selectedVehicleId);

    let stopEvents = [];
    if (chronicleFrame.isValid()
    && chronicleFrame.hasPositions()
    && chronicleFrame.stopEvents.length > 0) {
      stopEvents = this.state.expandStopEvents ? chronicleFrame.stopEvents.map(this.makeChronoEventStaticPopups)
      : chronicleFrame.stopEvents.map(this.makeChronoEventMarker);
    }

    let mwaJobs = [];
    if (chronicleFrame.isValid()
    && chronicleFrame.hasPositions()
    && chronicleFrame.mwaJobs !== undefined
    && chronicleFrame.mwaJobs.length > 0) {
      mwaJobs = chronicleFrame.mwaJobs.map(this.makeChronoMWAMarker);
    }

    return (
      <Layout.ScreenWithList>
        <div className={styles.tripsContainer}>
          <div className={styles.tripsTitle}>Trips</div>
          <div className={styles.tripsWrapper}>

            { this.renderFakeTrips(this.props.selectedVehicleId) }

            <a href="/" className={styles.tripSubmit} onClick={this.onTripSubmit}>Show Selected</a>
            
          </div>
        </div>
        <PowerList
          scrollable
          filter={
            <Filter filterFunc={this.props.filterFunc} />
          }
          content={
            <div>
              <h3 className={styles.title}>Vehicles</h3>
              <h5 className={styles.subtitle}>ALL</h5>
              <VehiclesList
                data={this.props.vehicles}
                currentExpandedItemId={this.props.selectedVehicleId}
                type={listTypes.vehicleChronicle}
              />
            </div>
          }
        />
        <FixedContent containerClassName={styles.fixedContent}>
          <TheMap>
            {this.props.vehicles.map(this.makeChronoPath)}
            {this.props.vehicles.map(this.makeChronoMarker)}
            {stopEvents}
            {mwaJobs}
            <GFEditorMapComponent />
            <CtxtOpenGoogleMap />
          </TheMap>
          <div className={styles.allTheChronicleControllerscontainer}>
            <ChartTimeBox chronicleFrame={chronicleFrame} />
            <VelocityTransitionGroup
              enter={{ animation: 'slideDown' }}
              leave={{ animation: 'slideUp' }}
            >
              {
                this.props.hasChroniclePlayableFrames ?
                  <PlaybackController toggleEventsCallback={this.expandStopsToggle} />
                  : false
              }
            </VelocityTransitionGroup>
          </div>
        </FixedContent>
      </Layout.ScreenWithList>
    );
  }
}

DemoChronicle.propTypes = {
  vehicles: PropTypes.array.isRequired,
  selectedVehicleId: PropTypes.string.isRequired,

  filterFunc: PropTypes.func.isRequired,
  getInstanceChronicleFrameById: PropTypes.func.isRequired,
  hasChroniclePlayableFrames: PropTypes.bool.isRequired,
  isEditGF: PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  chronicleTimeFrame: getChronicleTimeFrame(state),
  getInstanceChronicleFrameById: getInstanceChronicleFrameById(state),
  hasChroniclePlayableFrames: hasChroniclePlayableFrames(state),
  isEditGF: gfEditIsEditing(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
  requestHistory,
};

export default connect(mapState, mapDispatch)(DemoChronicle);
