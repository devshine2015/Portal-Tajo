import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import ReportConfigurator from 'containers/ReportConfigurator';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import * as fromConfiguratorReducer from 'containers/ReportConfigurator/reducer';

const PreviewTable = ({
  headers = [],
  data,
}) => {
  const headerCells = headers.map(h => (
    <TableHeaderColumn key={h}>
      { h }
    </TableHeaderColumn>
  ));

  const bodyRows = data.map((row, i) => (
    <TableRow key={i}>
      {
        row.map((cell, j) => (
          <TableRowColumn key={j}>
            {cell}
          </TableRowColumn>
        ))
      }
    </TableRow>
  ));

  return (
    <div>
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>
              Date
            </TableHeaderColumn>
            { headerCells }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          { bodyRows }
        </TableBody>
      </Table>
    </div>
  );
};

PreviewTable.propTypes = {
  headers: React.PropTypes.arrayOf(
    React.PropTypes.string
  ).isRequired,
  data: React.PropTypes.array.isRequired,
};

const ReportsScreen = ({
  availableFields,
  data,
  // isLoading,
  selectedFields,
}) => {
  const headers = selectedFields.map(sf => (
    availableFields[sf].label
  ));

  return (
    <div className="configurator">
      <ReportConfigurator />
      <PreviewTable
        headers={headers}
        data={data}
      />
    </div>
  );
};

ReportsScreen.propTypes = {
  availableFields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      order: React.PropTypes.number.isRequired,
    })
  ).isRequired,
  data: React.PropTypes.array.isRequired,
  // isLoading: React.PropTypes.bool.isRequired,
  selectedFields: React.PropTypes.arrayOf(
    React.PropTypes.number
  ).isRequired,
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = (state) => ({
  data: fromConfiguratorReducer.getSavedReportData(state).toArray(),
  // isLoading: fromConfiguratorReducer.getReportLoadingState(state),
  selectedFields: fromConfiguratorReducer.getSelectedFields(state).toArray(),
  availableFields: fromConfiguratorReducer.getAvailableFields(state).toArray(),
});
const mapDispatch = {};

export default connect(mapState, mapDispatch)(PureReportsScreen);
