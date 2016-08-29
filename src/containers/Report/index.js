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
} from './reducer';
import { dataActions } from './actions';

const ReportsScreen = ({
  availableFields,
  data,
  hasReport,
  saveGenerated,
  selectedFields,
  noMaterialUI = false,
}) => {
  const headers = selectedFields.map(index => (
    availableFields[index].label
  ));

  return (
    <div className="configurator">
      <VehiclesList fixed={!noMaterialUI} />
      <FixedContent>
        <ReportConfigurator
          noMaterialUI={noMaterialUI}
          hideSplitter
          hasReport={hasReport}
          saveReport={saveGenerated}
        />

        <PreviewTable
          noMaterialUI={noMaterialUI}
          headers={headers}
          data={data}
        />
      </FixedContent>
    </div>
  );
};

ReportsScreen.propTypes = {
  availableFields: React.PropTypes.array.isRequired,
  data: React.PropTypes.object.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  saveGenerated: React.PropTypes.func.isRequired,
  selectedFields: React.PropTypes.object.isRequired,
  noMaterialUI: React.PropTypes.bool,
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = (state) => ({
  availableFields: fromConfigReducer.getAvailableFields(state).toArray(),
  data: getSavedReportData(state),
  hasReport: appHasStoredReport(state),
  selectedFields: fromConfigReducer.getSelectedFields(state),
});
const mapDispatch = { saveGenerated: dataActions.saveGenerated };

export default connect(mapState, mapDispatch)(PureReportsScreen);
