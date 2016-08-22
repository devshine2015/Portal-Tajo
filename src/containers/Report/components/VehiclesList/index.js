import React from 'react';
import pure from 'recompose/pure';
import PowerList from 'components/PowerListRefactored';
import VehiclesList from 'components/VehiclesList';
import Filter from 'components/Filter';

class ReportsVehiclesList extends React.Component {

  onVehicleCheck = (id, isInputChecked) => {
    this.props.chooseVehiclesForReport(id, isInputChecked);
  }

  renderList() {
    return (
      <VehiclesList
        onItemClick={this.onVehicleCheck}
        vehicles={this.props.vehicles}
        withCheckboxes
        // uncheckOnUnmount
      />
    );
  }

  render() {
    return (
      <PowerList
        filter={
          <Filter filterFunc={this.props.filterFunc} />
        }
        content={this.renderList()}
      />
    );
  }
}

ReportsVehiclesList.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  filterFunc: React.PropTypes.func.isRequired,
  chooseVehiclesForReport: React.PropTypes.func.isRequired,
};

export default pure(ReportsVehiclesList);
