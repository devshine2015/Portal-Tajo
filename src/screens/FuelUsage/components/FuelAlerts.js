import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import pure from 'recompose/pure';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import inClasses from './classes';

const FuelConsumption = ({ vehicleAlerts, totalConsumption }) => {
  const tableData = vehicleAlerts.map(
    alert => (
      <TableRow key={alert.date}>
        <TableRowColumn>{alert.alertType}</TableRowColumn>
        <TableRowColumn>{moment(alert.date).format('DD/MM/YY h:mm')}</TableRowColumn>
        <TableRowColumn>{alert.position ? `${alert.position.lat.toFixed(3)}, ${alert.position.lng.toFixed(3)}` : 'N/A'}</TableRowColumn>
        <TableRowColumn>{alert.liters.toFixed(1).toString()}</TableRowColumn>
        <TableRowColumn> {totalConsumption > 0 ? (100 * alert.liters / totalConsumption).toFixed(1).toString() : 'N/A'} </TableRowColumn>
      </TableRow>
    ));

  return (
    <div className={css(inClasses.container)}>
      <div className={css(inClasses.containerHeading)}>Fuel Alerts</div>
      <Table height="300px">
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Alert Type</TableHeaderColumn>
            <TableHeaderColumn>Date/Time</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
            <TableHeaderColumn>Liters</TableHeaderColumn>
            <TableHeaderColumn>% of consumption</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {tableData}
        </TableBody>
      </Table>
    </div>
  );
};

FuelConsumption.propTypes = {
  vehicleAlerts: PropTypes.array.isRequired,
  totalConsumption: PropTypes.number.isRequired,
};

export default pure(FuelConsumption);
