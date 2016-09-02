import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import VehiclesList from 'components/InstancesList';
import VehicleDetails from './components/VehicleDetails';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import FixedContent from 'components/FixedContent';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getVehicleById, cleanVehicle } from 'services/FleetModel/utils/vehicleHelpers';
import { vehiclesActions } from 'services/FleetModel/actions';
import { getLoaderState } from './reducer';
import { detailsActions } from './actions';
import { showSnackbar } from 'containers/Snackbar/actions';

import styles from './styles.css';

class VehiclesEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedVehicle: undefined,
      selectedVehicleOriginalIndex: undefined,
      selectedVehicelId: undefined,
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
        selectedVehicelId: id,
        selectedVehicle: v.vehicle,
        selectedVehicleOriginalIndex: v.vehicleIndex,
      });
    }
  }

  /**
   * Combine new data with the old ones
   * since server requiring all details to be sent
   **/
  onDetailsSave = (data) => {
    const { selectedVehicle } = this.state;
    const updatedDetails = {
      ...selectedVehicle,
      ...data,
    };
    const details = cleanVehicle(updatedDetails);

    this.props.updateDetails(details)
      .then(() => {
        this.props.showSnackbar('Succesfully sended ✓', 3000);
      }, () => {
        this.props.showSnackbar('Something went wrong. Try later. ✓', 5000);
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
      kind: origins.kind,
      name: origins.name,
      year: origins.year,
      model: origins.model,
      make: origins.make,
      licensePlate: origins.licensePlate,
      odometer: parseInt(origins.dist.total / 1000, 10),
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
              onItemClick={this.onItemClick}
              data={this.props.vehicles}
              currentExpandedItemId={this.state.selectedVehicelId}
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
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  isLoading: getLoaderState(state),
});
const mapDispatch = {
  filterFunc: vehiclesActions.filterVehicles,
  updateDetails: detailsActions.updateDetails,
  showSnackbar,
};

const PureVehiclesEditor = pure(VehiclesEditor);

export default connect(mapState, mapDispatch)(PureVehiclesEditor);
