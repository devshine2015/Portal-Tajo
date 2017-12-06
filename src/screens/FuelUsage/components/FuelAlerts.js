import React from 'react';
import { css } from 'aphrodite/no-important';
import DashboardElements from 'components/DashboardElements';
import pure from 'recompose/pure';

import { theme } from 'configs';
import inClasses from '../styles';
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

const redBadge = {
  backgroundColor: 'red',
};
const greenBadge = {
  backgroundColor: 'green',
};
const lossCount = 0;

class FuelConsumption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  render() {
    const headClass = css(inClasses.tableHead);
    const classNameAltrs = css(inClasses.tableCellAlerts);
    console.log(this.props.vehicleAlerts);
    const tableData = this.props.vehicleAlerts.map(
      alert => (
        <TableRow>
          <TableRowColumn>{alert.alertType}</TableRowColumn>
          <TableRowColumn>{moment(alert.date).format('DD/MM/YY h:mm')}</TableRowColumn>
          <TableRowColumn>N/A</TableRowColumn>
          <TableRowColumn>{alert.liters.toFixed(1).toString()}</TableRowColumn>
          <TableRowColumn>N/A</TableRowColumn>
        </TableRow>
      ));


    return (
      <div className={css(inClasses.container)}>
        <div className={css(inClasses.containerHeading)}>Fuel Alerts</div>
        <Table height={300}>
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
  }
}

FuelConsumption.propTypes = {
  vehicleAlerts: PropTypes.array.isRequired,
};

export default pure(FuelConsumption);
