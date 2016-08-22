import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import ReportConfigurator from './components/ReportConfigurator';
import PreviewTable from './components/PreviewTable';
import VehiclesList from './components/VehiclesList';
import FixedContent from 'components/FixedContent';
import * as fromConfigReducer from './reducers/configuratorReducer';
import {
  getSavedReportData,
  appHasStoredReport,
  getFilteredVehicles,
  isFiltering,
} from './reducer';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { dataActions, vehiclesActions } from './actions';
// import { filterByName } from 'services/FleetModel/utils/vehicleHelpers';

const ReportsScreen = ({
  availableFields,
  chooseVehiclesForReport,
  data,
  // filteredVehicles,
  filterFunc,
  filtering,
  hasReport,
  originVehicles,
  saveGenerated,
  selectedFields,
  filteredVehicles,
}) => {
  const headers = selectedFields.map(index => (
    availableFields[index].label
  ));
  const vToDisplay = filtering ? filteredVehicles : originVehicles;

  return (
    <div className="configurator">
      { originVehicles.length !== 0 && (
        <VehiclesList
          vehicles={vToDisplay}
          chooseVehiclesForReport={chooseVehiclesForReport}
          filterFunc={filterFunc}
        />
      )}
      <FixedContent>
        <ReportConfigurator
          hideSplitter
          hasReport={hasReport}
          saveReport={saveGenerated}
        />

        <PreviewTable
          headers={headers}
          data={data}
        />
      </FixedContent>
    </div>
  );
};

ReportsScreen.propTypes = {
  availableFields: React.PropTypes.array.isRequired,
  chooseVehiclesForReport: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
  filtering: React.PropTypes.bool.isRequired,
  filterFunc: React.PropTypes.func.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  originVehicles: React.PropTypes.array.isRequired,
  saveGenerated: React.PropTypes.func.isRequired,
  selectedFields: React.PropTypes.object.isRequired,
  filteredVehicles: React.PropTypes.array.isRequired,
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = (state) => ({
  availableFields: fromConfigReducer.getAvailableFields(state).toArray(),
  data: getSavedReportData(state),
  hasReport: appHasStoredReport(state),
  originVehicles: fromFleetReducer.getVehicles(state).toArray(),
  selectedFields: fromConfigReducer.getSelectedFields(state),
  filteredVehicles: getFilteredVehicles(state).toArray(),
  filtering: isFiltering(state),
});
const mapDispatch = {
  saveGenerated: dataActions.saveGenerated,
  chooseVehiclesForReport: vehiclesActions.chooseVehiclesForReport,
  filterFunc: vehiclesActions.filterVehicles,
};

export default connect(mapState, mapDispatch)(PureReportsScreen);
