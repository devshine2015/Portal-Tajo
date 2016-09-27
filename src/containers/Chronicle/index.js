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
import ChronicleMap from 'containers/MapFleet/chronicle';
import { requestHistory } from 'containers/Chronicle/actions';
import { getChronicleTimeFrame,
  getInstanceChronicleFrameById, hasChroniclePlayableFrames } from './reducer';
import GFEditor from 'containers/GFEditor';
import createEventDispatcher from 'utils/eventDispatcher';

import { gfEditIsEditing } from 'containers/GFEditor/reducer';
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

  componentDidMount() {
// providing continuous UX - same vehicle selected when switching from other screens
    const globalSelectedVehicleId = this.props.globalSelectedVehicleId;
    if (globalSelectedVehicleId !== '') {
      this.onItemClick(globalSelectedVehicleId);
    }
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
      this.props.setSelectedVehicleId(id);
      if (!this.props.getInstanceChronicleFrameById(id).isValid()) {
        const currentTimeFrame = this.props.chronicleTimeFrame;
        this.props.requestHistory(id, currentTimeFrame.fromDate, currentTimeFrame.toDate);
      }
    }
  }

  render() {
    if (this.props.vehicles.length === 0) {
      return null;
    }
    const chronicleFrame = this.props.getInstanceChronicleFrameById(this.state.selectedVehicleId);

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
                onItemClick={this.onItemClick}
                data={this.props.vehicles}
                currentExpandedItemId={this.state.selectedVehicleId}
                type={listTypes.vehicleChronicle}
              />
            }
          />)}
        <FixedContent containerClassName={styles.fixedContent}>
          <div className={styles.allTheChronicleControllerscontainer}>
            <TimeFrameController selectedVehicleId={this.state.selectedVehicleId} />
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
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
  setSelectedVehicleId: vehiclesActions.setSelectedVehicleId,
  showSnackbar,
  requestHistory,
};

const PureChronicle = pure(Chronicle);

export default connect(mapState, mapDispatch)(PureChronicle);
