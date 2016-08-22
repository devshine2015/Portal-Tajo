import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import PowerList from 'components/PowerListRefactored';
import VehiclesList from 'components/VehiclesList';
import Filter from 'components/Filter';
import { vehiclesActions } from '../../actions';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import {
  isFiltering,
  getFilteredVehicles,
  getSelectedVehicles,
} from '../../reducer';

class ReportsVehiclesList extends React.Component {

  onVehicleCheck = (id, isInputChecked) => {
    this.props.chooseVehiclesForReport(id, isInputChecked);
  }

  renderList() {
    const vToDisplay = this.props.filtering ?
      this.props.filteredVehicles : this.props.originVehicles;

    return (
      <VehiclesList
        onItemClick={this.onVehicleCheck}
        vehicles={vToDisplay}
        selectedItems={this.props.selectedVehicles}
        withCheckboxes
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
  filterFunc: React.PropTypes.func.isRequired,
  filtering: React.PropTypes.bool.isRequired,
  chooseVehiclesForReport: React.PropTypes.func.isRequired,
  originVehicles: React.PropTypes.array.isRequired,
  filteredVehicles: React.PropTypes.array.isRequired,
  selectedVehicles: React.PropTypes.array.isRequired,
};

const mapState = (state) => ({
  originVehicles: fromFleetReducer.getVehicles(state).toArray(),
  filtering: isFiltering(state),
  filteredVehicles: getFilteredVehicles(state).toArray(),
  selectedVehicles: getSelectedVehicles(state).toArray(),
});
const mapDispatch = {
  chooseVehiclesForReport: vehiclesActions.chooseVehiclesForReport,
  filterFunc: vehiclesActions.filterVehicles,
};

const PureReportVehiclesList = pure(ReportsVehiclesList);

export default connect(mapState, mapDispatch)(PureReportVehiclesList);

