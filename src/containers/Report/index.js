import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import cs from 'classnames';
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
  vehiclesClassName,
  contentClassName,
}) => {
  const headers = selectedFields.map(index => (
    availableFields[index].label
  ));

  const className = cs('configurator', contentClassName);

  return (
    <div className={className}>
      <VehiclesList
        fixed
        className={vehiclesClassName}
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
  vehiclesClassName: React.PropTypes.string,
  contentClassName: React.PropTypes.string,
  data: React.PropTypes.object.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  saveGenerated: React.PropTypes.func.isRequired,
  selectedFields: React.PropTypes.object.isRequired,
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
