import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import PowerList from 'components/PowerList';
import Filter from 'components/Filter';
import VehiclesList from 'components/InstancesList';
import listTypes from 'components/InstancesList/types';
import { vehiclesActions } from 'services/FleetModel/actions';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { getVehicleFilterString } from 'services/Global/reducer';
import { reportVehiclesActions } from '../../actions';
import { getSelectedVehicles } from '../../reducer';

class ReportsVehiclesList extends React.Component {

  onVehicleCheck = (id, isInputChecked) => {
    this.props.chooseVehiclesForReport(id, isInputChecked);
  }

  onFilter = (filterString) => {
    this.props.setFiltering(filterString);
    this.props.filterFunc(filterString);
  }

  renderList() {
    return (
      <VehiclesList
        onItemClick={this.onVehicleCheck}
        data={this.props.vehicles}
        selectedItems={this.props.selectedVehicles}
        type={listTypes.withCheckboxes}
      />
    );
  }

  render() {
    return (
      <PowerList
        scrollable
        fixed={this.props.fixed}
        className={this.props.className}
        filter={
          <Filter
            filterFunc={this.onFilter}
            defaultValue={this.props.vehicleFilterString}
          />
        }
        content={this.renderList()}
      />
    );
  }
}

ReportsVehiclesList.propTypes = {
  className: PropTypes.string,
  filterFunc: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
  chooseVehiclesForReport: PropTypes.func.isRequired,
  vehicles: PropTypes.array.isRequired,
  selectedVehicles: PropTypes.array.isRequired,
  fixed: PropTypes.bool,
  vehicleFilterString: PropTypes.string,
};

ReportsVehiclesList.defaultProps = {
  className: '',
  fixed: true,
  vehicleFilterString: '',
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesExSorted(state),
  selectedVehicles: getSelectedVehicles(state).toArray(),
  vehicleFilterString: getVehicleFilterString(state),
});
const mapDispatch = {
  chooseVehiclesForReport: reportVehiclesActions.chooseVehiclesForReport,
  setFiltering: reportVehiclesActions.setFiltering,
  filterFunc: vehiclesActions.filterVehicles,
};

const PureReportVehiclesList = pure(ReportsVehiclesList);

export default connect(mapState, mapDispatch)(PureReportVehiclesList);

