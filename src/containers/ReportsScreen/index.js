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
  data = [],
}) => {
  const headerCells = headers.map(h => (
    <TableHeaderColumn key={h}>
      { h }
    </TableHeaderColumn>
  ));
  return (
    <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          { headerCells }
        </TableRow>
      </TableHeader>
      <TableBody />
    </Table>
  );
};

PreviewTable.propTypes = {
  headers: React.PropTypes.arrayOf(
    React.PropTypes.string
  ).isRequired,
};

class ReportsScreen extends React.Component {

  render() {
    const headers = this.props.selectedFields.map(sf => (
      this.props.availableFields[sf].label
    ));
    return (
      <div className="configurator">
        <ReportConfigurator />
        <PreviewTable
          headers={headers}
          data={[]}
        />
      </div>
    );
  }
}

ReportsScreen.propTypes = {
  availableFields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      order: React.PropTypes.number.isRequired,
    })
  ).isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  selectedFields: React.PropTypes.arrayOf(
    React.PropTypes.number
  ).isRequired,
};

const PureReportsScreen = pure(ReportsScreen);

const mapState = (state) => ({
  isLoading: fromConfiguratorReducer.getReportLoadingState(state),
  selectedFields: fromConfiguratorReducer.getSelectedFields(state).toArray(),
  availableFields: fromConfiguratorReducer.getAvailableFields(state).toArray(),
});
const mapDispatch = {};

export default connect(mapState, mapDispatch)(PureReportsScreen);
