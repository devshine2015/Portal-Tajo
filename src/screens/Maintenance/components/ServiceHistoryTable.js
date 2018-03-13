import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const ServiceHistoryTable = props => (
  <Table
    fixedHeader
    height={'290px'}
    selecable={false}
  >
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        <TableHeaderColumn
          colSpan="3"
          style={{ color: 'rgba(0, 97, 158, 0.75)', fontSize: '18px', textAlign: 'center' }}
        >
          Service History
        </TableHeaderColumn>
      </TableRow>
      <TableRow>
        <TableHeaderColumn>Date</TableHeaderColumn>
        <TableHeaderColumn>Odometer Value</TableHeaderColumn>
        <TableHeaderColumn>Notes</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
    >
      {
        props.history.map((historyItem, index) => (
          <TableRow key={historyItem.odometer.value + index.toString()}>
            <TableRowColumn>{moment(historyItem.odometer.ts).format('DD-MM-YYYY')}</TableRowColumn>
            <TableRowColumn>{historyItem.odometer.value}</TableRowColumn>
            <TableRowColumn>{historyItem.odometer.note}</TableRowColumn>
          </TableRow>
        ))
      }
    </TableBody>
  </Table>
);

ServiceHistoryTable.propTypes = {
  history: PropTypes.array.isRequired,
};

export default ServiceHistoryTable;
