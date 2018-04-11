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

const ClickableRow = (props) => {
  // destructure props to keep the expected MUI TableRow props
  // while having access to the rowData prop
  const { lat, lng, ...restProps } = props;
  return (
    <TableRow
      {...restProps}
      onMouseDown={() => console.log('clicked', props)}
    >
      {props.children}
    </TableRow>
  );
};

const FuelConsumption = ({ vehicleAlerts, totalConsumption, height }) => {
  const tableData = vehicleAlerts.map(
    (alert, i) => (
      <ClickableRow
        key={`${moment(alert.date).utc().format('YYYY-MM-DDTHH-mm-ss-SSS')}&${i}`}
        lat={alert.position.lat}
        lng={alert.position.lng}
      >
        <TableRowColumn>{alert.alertType}</TableRowColumn>
        <TableRowColumn>{moment(alert.date).utc().format('DD/MM/YY HH:mm')}</TableRowColumn>
        {/* <TableRowColumn>{alert.position ?
          `${alert.position.lat.toFixed(3)}, ${alert.position.lng.toFixed(3)}` :
          'N/A'}</TableRowColumn> */}
        <TableRowColumn>{alert.liters.toFixed(1).toString()}</TableRowColumn>
        <TableRowColumn> {totalConsumption > 0 ?
          ((100 * alert.liters) / totalConsumption).toFixed(1).toString() :
          'N/A'} </TableRowColumn>
      </ClickableRow>
    ));

  return (
    <div className={css(inClasses.container)}>
      <div className={css(inClasses.containerHeading)}>Fuel Alerts</div>
      <Table
        height={height}
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Alert Type</TableHeaderColumn>
            <TableHeaderColumn>Date/Time</TableHeaderColumn>
            {/* <TableHeaderColumn>Location</TableHeaderColumn> */}
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
  height: PropTypes.string.isRequired,
};

export default pure(FuelConsumption);
