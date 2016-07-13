import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import VehiclesList from './components/VehiclesList';
import VehicleDetails from './components/VehicleDetails';
import FixedColumn from 'components/FixedColumn';
import FixedContent from 'components/FixedContent';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getLoaderState } from './reducer';
import { detailsActions } from './actions';
import { showSnackbar } from 'containers/Snackbar/actions';

import styles from './styles.css';

class VehiclesEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedVehicleIndex: undefined,
    };
  }

  /**
   * Choose vehicle by index
   **/
  onItemClick = (index) => {
    this.setState({
      selectedVehicleIndex: index,
    });
  }

  /**
   * Combine new data with the old ones
   * since server requiring all details to be sent
   **/
  onDetailsSave = (data) => {
    const { selectedVehicleIndex } = this.state;
    const origins = this.props.vehicles.get(selectedVehicleIndex);
    const updatedDetails = {
      ...origins,
      ...data,
    };

    this.props.updateDetails(updatedDetails, selectedVehicleIndex)
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
      selectedVehicleIndex: undefined,
    });
  }

  renderDetails() {
    const { selectedVehicleIndex } = this.state;

    if (selectedVehicleIndex === undefined) {
      return null;
    }

    /**
     * Provide data required by component
     **/
    const origins = this.props.vehicles.get(selectedVehicleIndex);
    const data = {
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

        <FixedColumn containerClassName={styles.listContainer}>
          <VehiclesList
            onItemClick={this.onItemClick}
            vehicles={this.props.vehicles}
          />
        </FixedColumn>

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
