import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import RaisedButton from 'material-ui/RaisedButton';
import ReportConfigurator from './components/ReportConfigurator';
import PreviewTable from './components/PreviewTable';
import * as fromConfigReducer from './reducers/configuratorReducer';
import { getSavedReportData, appHasStoredReport } from './reducer';
import { dataActions } from './actions';

const ReportsScreen = ({
  availableFields,
  data,
  hasReport,
  saveGenerated,
  selectedFields,
}) => {
  const headers = selectedFields.map(index => (
    availableFields[index].label
  ));

  return (
    <div className="configurator">
      <ReportConfigurator
        hideSplitter
      />
      { hasReport && (
          <RaisedButton
            label="Save Generated"
            onClick={saveGenerated}
            primary
          />
      )}
      <PreviewTable
        headers={headers}
        data={data}
      />
    </div>
  );
};

ReportsScreen.propTypes = {
  availableFields: React.PropTypes.array.isRequired,
  data: React.PropTypes.object.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  saveGenerated: React.PropTypes.func.isRequired,
  selectedFields: React.PropTypes.object.isRequired,
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = (state) => ({
  data: getSavedReportData(state),
  hasReport: appHasStoredReport(state),
  selectedFields: fromConfigReducer.getSelectedFields(state),
  availableFields: fromConfigReducer.getAvailableFields(state).toArray(),
});
const mapDispatch = {
  saveGenerated: dataActions.saveGenerated,
};

export default connect(mapState, mapDispatch)(PureReportsScreen);
