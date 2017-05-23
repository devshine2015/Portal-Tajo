//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
// import { metersToKmString, speedToString, msToTimeIntervalString, dateToHHMM } from 'utils/convertors';

import Layout from 'components/Layout';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { getInstanceExecReportFrameById } from './../../services/reducer';
import styles from './styles.css';

// import classes from './classes';

const cellStyle = {
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
};
const timeCellStyle = {
  // width: '20%',
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
};

const EventRow = ({
  aEvent,
}) => (
  <TableRow className={styles.row}>
    <TableRowColumn style={timeCellStyle}>{aEvent.ev.ts}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{aEvent.type}</TableRowColumn>
  </TableRow>
);

EventRow.propTypes = {
  aEvent: React.PropTypes.object.isRequired,
};


const EventsTable = ({
  vehicleId,
  getSoloReportById,
}) => {
  const reportFrame = getSoloReportById(vehicleId);
  if (reportFrame === null) {
    return false;
  }
  const events = reportFrame.events.filter(ev => (ev.type !== 'vehicle-position'
    && ev.type !== 'vehicle-fuel'
    && ev.type !== 'vehicle-1wire-temperature'
    && ev.type !== 'odometer-changed'
    && ev.type !== 'device-moved'
    && ev.type !== 'device-fuel'))
  .map(aEvent => <EventRow key={aEvent.ev.receivedTs} aEvent={aEvent} />);
  return (
    <Layout.Content style={{ alignItems: 'center' }}>
      <Table selectable={false}>
        <TableHeader enableSelectAll={false}displaySelectAll={false} adjustForCheckbox={false} >
          <TableRow>
            <TableHeaderColumn style={timeCellStyle}>Time</TableHeaderColumn>
            <TableHeaderColumn style={cellStyle}>Event</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events}
        </TableBody>
      </Table>
    </Layout.Content>
  );
};

EventsTable.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  getSoloReportById: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(EventsTable));
