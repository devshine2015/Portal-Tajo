import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import VehiclesList from 'components/InstancesList';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import FixedContent from 'components/FixedContent';
import TimeFrameController from './components/TimeFrameSelector';
import ChartTimeBox from './components/ChartTimeBox';
import PlaybackController from './components/PlaybackController';

import TheMap from 'containers/MapFleet/MapContainer';
import ChroniclePath from 'containers/MapFleet/components/ChroniclePath';

import { requestHistory } from 'containers/Chronicle/actions';
import { getChronicleTimeFrame,
  getInstanceChronicleFrameById, hasChroniclePlayableFrames } from './reducer';
import { ctxGetSelectedVehicleId } from 'services/Global/reducers/contextReducer';

import GFEditor from 'containers/GFEditor/GFEditor';
import GFEditorMapComponent from 'containers/GFEditor/MapComponenet';

import { gfEditIsEditing } from 'containers/GFEditor/reducer';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';
import { vehiclesActions } from 'services/FleetModel/actions';
import { showSnackbar } from 'containers/Snackbar/actions';
import listTypes from 'components/InstancesList/types';

import styles from './styles.css';

class Chronicle extends React.Component {

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

  render() {
    if (this.props.vehicles.length === 0) {
      return null;
    }
    const chronicleFrame = this.props.getInstanceChronicleFrameById(this.props.selectedVehicleId);

    return (
      <div className={styles.topContainer}>

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
            <VelocityTransitionGroup enter={{ animation: 'slideDown' }}
              leave={{ animation: 'slideUp' }}
            >
              { this.props.hasChroniclePlayableFrames ?
                <PlaybackController />
                : false
              }
            </VelocityTransitionGroup>
          </div>
          <TheMap>
            {this.props.vehicles.map(this.makeChronoPath)}
            <GFEditorMapComponent />
        </TheMap>
          {/*<ChronicleMap
            selectedVehicle={this.state.selectedVehicle}
          />*/}
        </FixedContent>
      </div>
    );
  }
}

Chronicle.propTypes = {
  showSnackbar: React.PropTypes.func.isRequired,

  vehicles: React.PropTypes.array.isRequired,
  selectedVehicleId: React.PropTypes.string.isRequired,

  filterFunc: React.PropTypes.func.isRequired,
  requestHistory: React.PropTypes.func.isRequired,
  chronicleTimeFrame: React.PropTypes.object.isRequired,
  getInstanceChronicleFrameById: React.PropTypes.func.isRequired,
  hasChroniclePlayableFrames: React.PropTypes.bool.isRequired,
  setSelectedVehicleId: React.PropTypes.func.isRequired,
  globalSelectedVehicleId: React.PropTypes.string.isRequired,
  isEditGF: React.PropTypes.bool.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  chronicleTimeFrame: getChronicleTimeFrame(state),
  getInstanceChronicleFrameById: getInstanceChronicleFrameById(state),
  hasChroniclePlayableFrames: hasChroniclePlayableFrames(state),
  globalSelectedVehicleId: fromFleetReducer.getSelectedVehicleId(state),
  isEditGF: gfEditIsEditing(state),
  selectedVehicleId: ctxGetSelectedVehicleId(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
  setSelectedVehicleId: vehiclesActions.setSelectedVehicleId,
  showSnackbar,
  requestHistory,
};

const PureChronicle = pure(Chronicle);

export default connect(mapState, mapDispatch)(PureChronicle);
