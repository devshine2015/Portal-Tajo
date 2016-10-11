import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import VehiclesList from 'components/InstancesList';
import VehicleDetails from './components/VehicleDetails';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import FixedContent from 'components/FixedContent';
import { getVehicleById } from 'services/FleetModel/utils/vehicleHelpers';
import { vehiclesActions } from 'services/FleetModel/actions';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getLoaderState } from './reducer';
import { detailsActions } from './actions';
import { showSnackbar } from 'containers/Snackbar/actions';

import styles from './styles.css';

class VehiclesEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.getSelectedState({
        id: props.globalSelectedVehicleId,
        vehicles: props.vehicles,
      }),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.vehicles.length && nextProps.vehicles.length) {
      this.setState({
        ...this.getSelectedState({
          id: nextProps.globalSelectedVehicleId,
          vehicles: nextProps.vehicles,
        }),
      });
    }
  }
  /**
   * Combine new data with the old ones
   * since server requiring all details to be sent
   * needResort if name has been changed
   **/
  onDetailsSave = (data, needResort) => {
    const { selectedVehicleId } = this.state;

    this.props.updateDetails(data, selectedVehicleId, needResort)
      .then((newIndex = undefined) => {
        this.setState({
          selectedVehicleOriginalIndex: newIndex,
        }, () => {
          this.props.showSnackbar('Succesfully sended ✓', 3000);
        });
      }, () => {
        this.props.showSnackbar('Something went wrong. Try later. ✓', 5000);
      });
  }

  onChooseVehicle = id => {
    this.setState({
      ...this.getSelectedState({
        id,
        vehicles: this.props.vehicles,
      }),
    });
  }

  getSelectedState = ({
    id,
    vehicles,
  }) => {
    const result = {
      selectedVehicleOriginalIndex: undefined,
      selectedVehicleId: undefined,
    };

    if (id) {
      const v = getVehicleById(id, vehicles);

      result.selectedVehicleId = id;
      result.selectedVehicleOriginalIndex = v.vehicleIndex;
    } else if (vehicles.length > 0) {
      result.selectedVehicleId = vehicles[0].id;
      result.selectedVehicleOriginalIndex = 0;
    }

    return result;
  }

  /**
   * Close editor
   **/
  closeEditor = () => {
    this.setState({
      selectedVehicleOriginalIndex: undefined,
    });
  }

  renderDetails() {
    const { selectedVehicleOriginalIndex } = this.state;

    if (selectedVehicleOriginalIndex === undefined) {
      return null;
    }

    /**
     * Provide data required by component
     **/
    const origins = this.props.vehicles[selectedVehicleOriginalIndex];
    const data = {
      kind: origins.kind,
      name: origins.name,
      year: origins.year,
      model: origins.model,
      make: origins.make,
      deviceId: origins.deviceId,
      licensePlate: origins.licensePlate,
      odometer: (origins.dist.total / 1000).toFixed(0),
    };

    return (
      <FixedContent containerClassName={styles.detailsContainer}>
        <VehicleDetails
          details={data}
          id={origins.id}
          onSave={this.onDetailsSave}
          onCancel={this.closeEditor}
          disabled={this.props.isLoading}
        />
      </FixedContent>
    );
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
              onItemClick={this.onChooseVehicle}
              data={this.props.vehicles}
              currentExpandedItemId={this.state.selectedVehicleId}
            />
          }
        />

        {this.renderDetails()}

      </div>
    );
  }
}

VehiclesEditor.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  vehicles: React.PropTypes.array.isRequired,
  updateDetails: React.PropTypes.func.isRequired,
  filterFunc: React.PropTypes.func.isRequired,
  globalSelectedVehicleId: React.PropTypes.string.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  isLoading: getLoaderState(state),
  globalSelectedVehicleId: fromFleetReducer.getSelectedVehicleId(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
  updateDetails: detailsActions.updateDetails,
  showSnackbar,
};

const PureVehiclesEditor = pure(VehiclesEditor);

export default connect(mapState, mapDispatch)(PureVehiclesEditor);
