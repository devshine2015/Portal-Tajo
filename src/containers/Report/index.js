import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import ReportConfigurator from './components/ReportConfigurator';
import PreviewTable from './components/PreviewTable';
import VehiclesList from './components/VehiclesList';
import FixedContent from 'components/FixedContent';
import * as fromConfigReducer from './reducers/configuratorReducer';
import { getSavedReportData, appHasStoredReport } from './reducer';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import { dataActions, vehiclesActions } from './actions';

const ReportsScreen = ({
  availableFields,
  changeVehiclesForReport,
  data,
  hasReport,
  saveGenerated,
  selectedFields,
  vehicles,
}) => {
  const headers = selectedFields.map(index => (
    availableFields[index].label
  ));

  return (
    <div className="configurator">
      <VehiclesList
        vehicles={vehicles}
        changeVehiclesForReport={changeVehiclesForReport}
      />
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
  changeVehiclesForReport: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  saveGenerated: React.PropTypes.func.isRequired,
  selectedFields: React.PropTypes.object.isRequired,
  vehicles: React.PropTypes.array.isRequired,
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = (state) => ({
  data: getSavedReportData(state),
  hasReport: appHasStoredReport(state),
  selectedFields: fromConfigReducer.getSelectedFields(state),
  availableFields: fromConfigReducer.getAvailableFields(state).toArray(),
  vehicles: fromFleetReducer.getVehicles(state).toArray(),
});
const mapDispatch = {
  saveGenerated: dataActions.saveGenerated,
  changeVehiclesForReport: vehiclesActions.changeVehiclesForReport,
};

export default connect(mapState, mapDispatch)(PureReportsScreen);
