import React from 'react';
import pure from 'recompose/pure';
import PowerList from 'components/PowerListRefactored';
import VehiclesListItem from 'components/VehiclesList/WithCheckboxes/VehiclesListItem';
import { filterByName } from 'services/FleetModel/utils/vehicleHelpers';

class ReportsVehiclesList extends React.Component {

  onVehicleCheck = (e, isInputChecked) => {
    this.props.changeVehiclesForReport(e.target.name, isInputChecked);
  }

  render() {
    return (
      <PowerList
        dataList={this.props.vehicles}
        filterFunc={filterByName}
        contentItem={
          <VehiclesListItem
            onClick={this.onVehicleCheck}
          />
        }
      />
    );
  }
}

ReportsVehiclesList.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  changeVehiclesForReport: React.PropTypes.func.isRequired,
};

export default pure(ReportsVehiclesList);
