import React from 'react';
import pure from 'recompose/pure';
import PowerList from 'components/PowerListRefactored';
import VehiclesList from 'components/VehiclesList';
import Filter from 'components/Filter';
import { filterByName } from 'services/FleetModel/utils/vehicleHelpers';

class ReportsVehiclesList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filteredList: props.vehicles,
    };
  }

  onVehicleCheck = (name, isInputChecked) => {
    this.props.changeVehiclesForReport(name, isInputChecked);
  }

  updateFilteredList = (newList) => {
    this.setState({
      filteredList: newList,
    });
  }

  renderList() {
    return (
      <VehiclesList
        onItemClick={this.onVehicleCheck}
        vehicles={this.state.filteredList}
        withCheckboxes
        uncheckOnUnmount
      />
    );
  }

  render() {
    return (
      <PowerList
        filter={
          <Filter
            filterFunc={filterByName(this.state.filteredList, this.props.vehicles)}
            onFilterFinish={this.updateFilteredList}
          />
        }
        content={this.renderList()}
      />
    );
  }
}

ReportsVehiclesList.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  changeVehiclesForReport: React.PropTypes.func.isRequired,
};

export default pure(ReportsVehiclesList);
