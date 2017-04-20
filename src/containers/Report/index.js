import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import cs from 'classnames';
import ReportConfigurator from './components/ReportConfigurator';
import PreviewTable from './components/PreviewTable';
import VehiclesList from './components/VehiclesList';
import FixedContent from 'components/FixedContent';
import {
  getAvailableReports,
  getSelectedReports,
  getSavedReportData,
  appHasStoredReport,
} from './reducer';
import { reportActions } from './actions';

const ReportsScreen = ({
  availableReports,
  data,
  hasReport,
  saveGenerated,
  selectedFields,
  vehiclesClassName,
  contentClassName,
}, context) => {
  // const headers = selectedFields.map(index => (
  //   availableReports[index].label
  // ));
  const headers = [];
  selectedFields.forEach(index => {
    if (availableReports[index].multiLabel !== undefined) {
      headers.push(...(availableReports[index].multiLabel.map(
          lbl => context.translator.getTranslation(lbl))));
    } else {
      headers.push(context.translator.getTranslation(availableReports[index].name));
    }
    // headers.push(availableReports[index].multiLabel !== undefined ?
    //       ...(availableReports[index].multiLabel) : availableReports[index].label);
  });

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
      </FixedContent>
    </div>
  );
};

ReportsScreen.propTypes = {
  availableReports: React.PropTypes.array.isRequired,
  vehiclesClassName: React.PropTypes.string,
  contentClassName: React.PropTypes.string,
  data: React.PropTypes.object.isRequired,
  hasReport: React.PropTypes.bool.isRequired,
  saveGenerated: React.PropTypes.func.isRequired,
  selectedFields: React.PropTypes.object.isRequired,
};
ReportsScreen.contextTypes = {
  translator: React.PropTypes.object.isRequired,
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = (state) => ({
  availableReports: getAvailableReports(state).toArray(),
  data: getSavedReportData(state),
  hasReport: appHasStoredReport(state),
  selectedFields: getSelectedReports(state),
});
const mapDispatch = {
  saveGenerated: reportActions.saveGenerated,
};

export default connect(mapState, mapDispatch)(PureReportsScreen);
