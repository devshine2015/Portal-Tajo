import React from 'react';
import pure from 'recompose/pure';
import PowerList from 'components/PowerListRefactored';
import VehiclesList from 'components/VehiclesList/WithCheckboxes';

class ReportsVehiclesList extends React.Component {

  onVehicleCheck = (e, isInputChecked) => {
    this.props.changeVehiclesForReport(e.target.name, isInputChecked);
  }

  render() {
    return (
      <PowerList>
        <VehiclesList
          vehicles={this.props.vehicles}
          onItemClick={this.onVehicleCheck}
        />
      </PowerList>
    );
  }
}

ReportsVehiclesList.propTypes = {
  vehicles: React.PropTypes.object.isRequired,
  changeVehiclesForReport: React.PropTypes.func.isRequired,
};

export default pure(ReportsVehiclesList);
