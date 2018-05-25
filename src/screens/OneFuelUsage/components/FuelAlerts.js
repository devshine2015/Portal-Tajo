import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import pure from 'recompose/pure';
import { mapSetFocusCoords } from 'containers/Map/reducerAction';

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
  const { lat, lng, onClickFunc, ...restProps } = props;
  return (
    <TableRow
      {...restProps}
      onMouseDown={() => {
        onClickFunc(lat, lng);
      }}
    >
      {props.children}
    </TableRow>
  );
};

class FuelConsumption extends Component {
  handleRowClick = (lat, lng) => {
    const coords = { lat, lng };
    this.props.mapSetFocusCoords(coords);
  }

  render() {
    const tableData = this.props.vehicleAlerts.map(
      (alert, i) => (
        <ClickableRow
          key={`${moment(alert.date).utc().format('YYYY-MM-DDTHH-mm-ss-SSS')}&${i}`}
          lat={alert.position.lat}
          lng={alert.position.lng}
          onClickFunc={this.handleRowClick}
        >
          <TableRowColumn>{alert.alertType}</TableRowColumn>
          <TableRowColumn>{moment(alert.date).utc().format('DD/MM/YY HH:mm')}</TableRowColumn>
          <TableRowColumn>{alert.liters.toFixed(1).toString()}</TableRowColumn>
          <TableRowColumn> {this.props.totalConsumption > 0 ?
            ((100 * alert.liters) / this.props.totalConsumption).toFixed(1).toString() :
            'N/A'} </TableRowColumn>
        </ClickableRow>
      ));
    return (
      <div className={css(inClasses.container)}>
        <div className={css(inClasses.containerHeading)}>Fuel Alerts</div>
        {
          tableData.length === 0 ? (
            <div style={{ padding: '16px 0', color: '#9e9e9e' }}>No alerts for a selected period</div>
          ) : (
            <Table
              height={this.props.height}
              selectable={false}
            >
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>Alert Type</TableHeaderColumn>
                  <TableHeaderColumn>Date/Time</TableHeaderColumn>
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
          )
        }
      </div>
    );
  }
}

FuelConsumption.propTypes = {
  vehicleAlerts: PropTypes.array.isRequired,
  totalConsumption: PropTypes.number.isRequired,
  height: PropTypes.string.isRequired,
  mapSetFocusCoords: PropTypes.func.isRequired,
};

const mapDispatch = {
  mapSetFocusCoords,
};

export default connect(null, mapDispatch)(pure(FuelConsumption));
