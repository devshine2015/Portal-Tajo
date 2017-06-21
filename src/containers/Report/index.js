import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import cs from 'classnames';
import Divider from 'material-ui/Divider';
import ReportConfigurator from './components/ReportConfigurator';
import PreviewTable from './components/PreviewTable';
import VehiclesList from './components/VehiclesList';
import FixedContent from 'components/FixedContent';
import {
  getAvailableReports,
  getSelectedReports,
  getSavedReportData,
  appHasStoredReport,
  getSavedReportSecondaryData,
  appHasStoredSecondaryReport,
} from './reducer';
import { reportActions } from './actions';

const ReportsScreen = ({
  availableReports,
  data,
  hasReport,
  secondaryData,
  hasSecondaryReport,
  saveGenerated,
  selectedFields,
  vehiclesClassName,
  contentClassName,
}, context) => {
  const headers = reportActions.getHeaders(context.translator, selectedFields, availableReports, false);
  const headersSecondary = reportActions.getHeaders(context.translator, selectedFields, availableReports, true);

  const className = cs('configurator', contentClassName);

  return (
    <div className={className}>
      <VehiclesList
        fixed
        className={vehiclesClassName}
      />
      <FixedContent>
        <ReportConfigurator
          hasReport={hasReport}
          saveReport={() => saveGenerated(context.translator)}
        />
        <PreviewTable
          headers={headers}
          data={data}
        />
        <Divider />
        <PreviewTable
          headers={headersSecondary}
          data={secondaryData}
        />
      </FixedContent>
    </div>
  );
};

ReportsScreen.contextTypes = {
  translator: React.PropTypes.object.isRequired,
};

ReportsScreen.propTypes = {
  availableReports: React.PropTypes.array.isRequired,
  vehiclesClassName: React.PropTypes.string,
  contentClassName: React.PropTypes.string,
  data: React.PropTypes.object.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  secondaryData: React.PropTypes.object.isRequired,
  hasSecondaryReport: React.PropTypes.bool.isRequired,
  saveGenerated: React.PropTypes.func.isRequired,
  selectedFields: React.PropTypes.object.isRequired,
};

ReportsScreen.defaultProps = {
  vehiclesClassName: '',
  contentClassName: '',
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = state => ({
  availableReports: getAvailableReports(state).toArray(),
  data: getSavedReportData(state),
  hasReport: appHasStoredReport(state),
  selectedFields: getSelectedReports(state),
  secondaryData: getSavedReportSecondaryData(state),
  hasSecondaryReport: appHasStoredSecondaryReport(state),
});
const mapDispatch = {
  saveGenerated: reportActions.saveGenerated,
};

export default connect(mapState, mapDispatch)(PureReportsScreen);
