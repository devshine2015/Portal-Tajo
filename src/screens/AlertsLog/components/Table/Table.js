import React from 'react';
import { css } from 'aphrodite/no-important';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import AlertTypeColumn from './AlertTypeColumn';
import classes from './classes';

class ResultsTable extends React.Component {

  renderRows() {
    return (
      <TableRow>
        <TableRowColumn>10:15</TableRowColumn>
        <TableRowColumn>
          <AlertTypeColumn />
        </TableRowColumn>
        <TableRowColumn>01-10</TableRowColumn>
      </TableRow>
    );
  }

  render() {
    return (
      <div className={css(classes.tableWrapper)}>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Time</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn>Vehicle</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            { this.renderRows() }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ResultsTable;
