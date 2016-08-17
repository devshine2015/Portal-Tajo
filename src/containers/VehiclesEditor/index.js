import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import VehiclesList from './components/VehiclesList';
import VehicleDetails from './components/VehicleDetails';
import PowerList from 'components/PowerListRefactored';
import Filter from 'containers/Filter';
import FixedContent from 'components/FixedContent';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getLoaderState } from './reducer';
import { detailsActions } from './actions';
import { showSnackbar } from 'containers/Snackbar/actions';

import styles from './styles.css';

function filterByName(searchString, allVehicles = []) {
  return allVehicles.filter(v =>
    v.name.toLowerCase().search(searchString) !== -1
  );
}

function getVehicleById(id, allVehicles = []) {
  let vehicleIndex;

  const vehicle = allVehicles.filter((v, i) => {
    if (v.id === id) {
      vehicleIndex = i;
      return true;
    }

    return false;
  }).get(0);

  return {
    vehicle,
    vehicleIndex,
  };
}

class VehiclesEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedVehicle: undefined,
      selectedVehicleOriginalIndex: undefined,
      filteredVehicles: props.vehicles,
    };

    this.onItemClick = this.onItemClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vehicles.size !== nextProps.vehicles.size) {
      this.setState({
        filteredVehicles: nextProps.vehicles,
      });
    }
  }

  /**
   * Choose vehicle by id
   **/
  onItemClick = (id) => {
    const v = getVehicleById(id, this.props.vehicles);

    this.setState({
      selectedVehicle: v.vehicle,
      selectedVehicleOriginalIndex: v.vehicleIndex,
    });
  }

  /**
   * Combine new data with the old ones
   * since server requiring all details to be sent
   **/
  onDetailsSave = (data) => {
    const { selectedVehicle, selectedVehicleOriginalIndex } = this.state;
    const updatedDetails = {
      ...selectedVehicle,
      ...data,
    };

    this.props.updateDetails(updatedDetails, selectedVehicleOriginalIndex)
      .then(() => {
        this.props.showSnackbar('Succesfully sended ✓', 3000);
        this.updateFilteredVehicles(updatedDetails);
      }, () => {
        this.props.showSnackbar('Something went wrong. Try later. ✓', 5000);
      });
  }

  onFilter = (value) => {
    this.setState({
      filteredVehicles: filterByName(value, this.props.vehicles),
    });
  }

  /**
   * Close editor
   **/
  closeEditor = () => {
    this.setState({
      selectedVehicleOriginalIndex: undefined,
    });
  }

  /**
   * Find changed vehicle in filteredVehicles array
   * and update its details
   **/
  updateFilteredVehicles(updatedDetails) {
    const v = getVehicleById(updatedDetails.id, this.state.filteredVehicles);
    const updatedFilteredVehicles = this.state.filteredVehicles.set(v.vehicleIndex, updatedDetails);

    this.setState({
      filteredVehicles: updatedFilteredVehicles,
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
    const origins = this.state.selectedVehicle;
    const data = {
      kind: origins.kind || '',
      name: origins.name,
      year: origins.year,
      model: origins.model,
      make: origins.make,
      licensePlate: origins.licensePlate,
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
    if (this.props.vehicles.size === 0) {
      return null;
    }

    return (
      <div className={styles.editor}>

        <PowerList>
          <Filter onTextChange={this.onFilter} />
          <VehiclesList
            onItemClick={this.onItemClick}
            vehicles={this.state.filteredVehicles}
          />
        </PowerList>

        {this.renderDetails()}

      </div>
    );
  }
}

VehiclesEditor.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  vehicles: React.PropTypes.object.isRequired,
  updateDetails: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehicles(state),
  isLoading: getLoaderState(state),
});
const mapDispatch = {
  updateDetails: detailsActions.updateDetails,
  showSnackbar,
};

const PureVehiclesEditor = pure(VehiclesEditor);

export default connect(mapState, mapDispatch)(PureVehiclesEditor);
