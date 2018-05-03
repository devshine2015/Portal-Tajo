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
  getInstanceChronicleFrameById,
  hasChroniclePlayableFrames,
} from './reducer';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';

import GFEditor from 'containers/GFEditor/GFEditor';
import GFEditorMapComponent from 'containers/GFEditor/MapComponenet';

import { gfEditIsEditing } from 'containers/GFEditor/reducer';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import listTypes from 'components/DemoInstancesList/types';

import styles from './styles.css';

class DemoChronicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandStopEvents: false,
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

    // let stopEventsPopups = [];
    // if (chronicleFrame.isValid()
    // && chronicleFrame.hasPositions()
    // && chronicleFrame.stopEvents.length > 0) {
    //   stopEventsPopups = chronicleFrame.stopEvents.map(this.makeChronoEventStaticPopups);
    // }

    let mwaJobs = [];
    if (chronicleFrame.isValid()
    && chronicleFrame.hasPositions()
    && chronicleFrame.mwaJobs !== undefined
    && chronicleFrame.mwaJobs.length > 0) {
      mwaJobs = chronicleFrame.mwaJobs.map(this.makeChronoMWAMarker);
    }

    return (
      <Layout.ScreenWithList>

        {this.props.isEditGF ? (
          <PowerList>
            <GFEditor />
          </PowerList>
        ) : (
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
        )}
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
  getInstanceChronicleFrameById: getInstanceChronicleFrameById(state),
  hasChroniclePlayableFrames: hasChroniclePlayableFrames(state),
  isEditGF: gfEditIsEditing(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
};

export default connect(mapState, mapDispatch)(DemoChronicle);
