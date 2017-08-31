import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
    <div style={{ margin: '24px 0 24px 0' }}>
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
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
  headers: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

export default pure(PreviewTable);
