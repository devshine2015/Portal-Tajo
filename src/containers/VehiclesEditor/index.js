import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import VehiclesList from './components/VehiclesList';
import VehicleDetails from './components/VehicleDetails';
import * as fromFleetReducer from 'services/FleetModel/reducer';

import styles from './styles.css';

class VehiclesEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedVehicleIndex: undefined,
    };
  }

  onItemClick = (index) => {
    this.setState({
      selectedVehicleIndex: index,
    });
  }

  onDetailsSave = (data) => {
    console.log(data);
  }

  renderDetails() {
    const { selectedVehicleIndex } = this.state;

    if (selectedVehicleIndex === undefined) {
      return null;
    }

    const origins = this.props.vehicles.get(selectedVehicleIndex);
    const data = {
      name: origins.name,
      year: origins.year,
      model: origins.model,
      make: origins.make,
      licensePlate: origins.licensePlate,
    };

    return (
      <div className={styles.detailsContainer}>
        <VehicleDetails
          details={data}
          id={origins.id}
          onSave={this.onDetailsSave}
        />
      </div>
    );
  }

  render() {
    if (this.props.vehicles.size === 0) {
      return null;
    }

    return (
      <div className={styles.editor}>

        <div className={styles.listContainer}>
          <VehiclesList
            onItemClick={this.onItemClick}
            vehicles={this.props.vehicles}
          />
        </div>

        {this.renderDetails()}

      </div>
    );
  }
}

VehiclesEditor.propTypes = {
  vehicles: React.PropTypes.object,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehicles(state),
});

const PureVehiclesEditor = pure(VehiclesEditor);

export default connect(mapState)(PureVehiclesEditor);
