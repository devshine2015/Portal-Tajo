import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import Layout from 'components/Layout';
import VehiclesList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import FixedContent from 'components/FixedContent';
import TimeFrameController from './components/TimeFrameSelector';
import ChartTimeBox from './components/ChartTimeBox';
import PlaybackController from './components/PlaybackController';

import TheMap from 'containers/Map/MapContainer';
import ChroniclePath from 'containers/Map/OnMapElements/ChroniclePath';
import ChronicleMarker from 'containers/Map/OnMapElements/ChronicleMarker';
import ChronicleEventMarker from 'containers/Map/OnMapElements/ChronicleEventMarker';
import ChronicleEventStaticPopUp from 'containers/Map/OnMapElements/ChronicleEventStaticPopUp';
import CtxtOpenGoogleMap from 'containers/Map/OnMapElements/CtxtMenuOpenGMap';
import mapMWAJobChronicleMarkerMaker from 'containers/Map/OnMapElements/MWAJobChronicleMarker';

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
import listTypes from 'components/InstancesList/types';

import styles from './styles.css';

class Chronicle extends React.Component {
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
                <VehiclesList
                  data={this.props.vehicles}
                  currentExpandedItemId={this.props.selectedVehicleId}
                  type={listTypes.vehicleChronicle}
                />
            }
            />)}
        <FixedContent containerClassName={styles.fixedContent}>
          <div className={styles.allTheChronicleControllerscontainer}>
            <TimeFrameController selectedVehicleId={this.props.selectedVehicleId} />
            <ChartTimeBox chronicleFrame={chronicleFrame} />
            <VelocityTransitionGroup
              enter={{ animation: 'slideDown' }}
              leave={{ animation: 'slideUp' }}
            >
              { this.props.hasChroniclePlayableFrames ?
                <PlaybackController toggleEventsCallback={this.expandStopsToggle} />
                : false
              }
            </VelocityTransitionGroup>
          </div>
          <TheMap>
            {this.props.vehicles.map(this.makeChronoPath)}
            {this.props.vehicles.map(this.makeChronoMarker)}
            {stopEvents}
            {mwaJobs}
            <GFEditorMapComponent />
            <CtxtOpenGoogleMap />
          </TheMap>
        </FixedContent>
      </Layout.ScreenWithList>
    );
  }
}

Chronicle.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  selectedVehicleId: React.PropTypes.string.isRequired,

  filterFunc: React.PropTypes.func.isRequired,
  getInstanceChronicleFrameById: React.PropTypes.func.isRequired,
  hasChroniclePlayableFrames: React.PropTypes.bool.isRequired,
  isEditGF: React.PropTypes.bool.isRequired,
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

const PureChronicle = pure(Chronicle);

export default connect(mapState, mapDispatch)(PureChronicle);
