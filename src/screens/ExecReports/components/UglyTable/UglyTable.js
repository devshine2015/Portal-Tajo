//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { metersToKmString, speedToString, msToTimeIntervalString,
  dateToHHMM, temperatureToString } from 'utils/convertors';

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

const btmColorStyle = { borderBottomColor: 'gray' };
const totalRowStyle = { WebkitPrintColorAdjust: 'exact', backgroundColor: 'beige', fontWeight: 'bold' };
// import classes from './classes';

const cellStyle = {
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
  fontSize: '11px',
};
const nameCellStyle = {
  width: '20%',
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
  fontSize: '11px',
};

const boldStyle = {
  fontWeight: 'bold',
};

const TripRow = ({
  aTrip,
}) => (
  <TableRow className={styles.row} style={btmColorStyle}>
    <TableRowColumn style={cellStyle}>{msToTimeIntervalString(aTrip.fromStopOwer.durationMs)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{dateToHHMM(aTrip.startDate)}</TableRowColumn>
    <TableRowColumn style={nameCellStyle}>{aTrip.fromStopOwer.address}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{dateToHHMM(aTrip.endDate)}</TableRowColumn>
    <TableRowColumn style={nameCellStyle}>{aTrip.toStopOver.address}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{msToTimeIntervalString(aTrip.calculatedOperationalDurationMs)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{msToTimeIntervalString(aTrip.calculatedIdleDurationMs)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{metersToKmString(aTrip.calculatedDistanceM)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{speedToString(aTrip.maxSpeed)}</TableRowColumn>
    <TableRowColumn style={cellStyle}>{speedToString(aTrip.avgSpeed)}</TableRowColumn>
    {aTrip.hasTemperature() &&
      <TableRowColumn style={cellStyle}>{temperatureToString(aTrip.maxTemp)}</TableRowColumn>
    }
    {aTrip.hasTemperature() &&
      <TableRowColumn style={cellStyle}>{temperatureToString(aTrip.minTemp)}</TableRowColumn>
    }
  </TableRow>
);
TripRow.propTypes = {
  aTrip: React.PropTypes.object.isRequired,
};

// maybe we will need to add total row at the end of the table?
// const TotalRow = ({
//   reportFrame,
// }) => (
//   <TableRow className={styles.row} style={{ ...btmColorStyle, ...totalRowStyle }}>
//     <TableRowColumn style={cellStyle}>{msToTimeIntervalString(reportFrame.durationMs)}</TableRowColumn>
//     <TableRowColumn style={cellStyle}>-</TableRowColumn>
//     <TableRowColumn style={nameCellStyle}>-</TableRowColumn>
//     <TableRowColumn style={cellStyle}>-</TableRowColumn>
//     <TableRowColumn style={nameCellStyle}>-</TableRowColumn>
//     <TableRowColumn style={cellStyle}>{msToTimeIntervalString(reportFrame.totalOperatinMs)}</TableRowColumn>
//     <TableRowColumn style={cellStyle}>{msToTimeIntervalString(reportFrame.totalIdleMs)}</TableRowColumn>
//     <TableRowColumn style={cellStyle}>{metersToKmString(reportFrame.totalDistanceM)}</TableRowColumn>
//     <TableRowColumn style={cellStyle}>{speedToString(reportFrame.totalMaxSpeed)}</TableRowColumn>
//     <TableRowColumn style={cellStyle}>{speedToString(reportFrame.totalAvgSpeed)}</TableRowColumn>
//   </TableRow>
// );

// TotalRow.propTypes = {
//   reportFrame: React.PropTypes.object.isRequired,
// };


class UglyTable extends React.Component {
  render() {
    const reportFrame = this.props.getSoloReportById(this.props.vehicleId);
    if (reportFrame === null) {
      return false;
    }
    const trips = reportFrame.getValidTrips().map(aTrip => <TripRow key={aTrip.startIdx} aTrip={aTrip} />);
  // trips.push(<TotalRow key={reportFrame.posData.length} reportFrame={reportFrame} />);
    const hasT = reportFrame.getValidTrips()[0].hasTemperature();
    const noBgdStyle = { backgroundColor: 'transparent' };
    return (
      <Layout.Content style={{ alignItems: 'center' }}>
        <Table ref={(input) => { this.tableRef = input; }} selectable={false} style={noBgdStyle}>
          <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false} style={noBgdStyle}>
            <TableRow style={btmColorStyle}>
              <TableHeaderColumn style={cellStyle}>Rest Duration</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>Start</TableHeaderColumn>
              <TableHeaderColumn style={nameCellStyle}>From</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>End</TableHeaderColumn>
              <TableHeaderColumn style={nameCellStyle}>To</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>Operation Duration</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>Idle</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>Dist</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>MaxV</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>AvgV</TableHeaderColumn>
              {hasT &&
                <TableHeaderColumn style={cellStyle}>MaxT</TableHeaderColumn>
              }
              {hasT &&
                <TableHeaderColumn style={cellStyle}>MinT</TableHeaderColumn>
              }
            </TableRow>
          </TableHeader>
          <TableBody style={noBgdStyle}>
            {trips}
          </TableBody>
        </Table>
      </Layout.Content>
    );
  }
}

UglyTable.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  getSoloReportById: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(UglyTable));
