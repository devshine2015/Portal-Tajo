import React, { PropTypes } from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
  metersToKmString,
  speedToString,
  msToTimeIntervalString,
  dateToHHMM,
  temperatureToString,
} from 'utils/convertors';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import Layout from 'components/Layout';
import { getInstanceExecReportFrameById } from './../../services/reducer';
import styles from './styles.css';
import phrases from '../PropTypes';

const btmColorStyle = { borderBottomColor: 'gray' };
// const totalRowStyle = { WebkitPrintColorAdjust: 'exact', backgroundColor: 'beige', fontWeight: 'bold' };
// import classes from './classes';

const cellStyle = {
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
  fontSize: '11px',
  textTransform: 'capitalize',
};
const nameCellStyle = {
  width: '20%',
  whiteSpace: 'normal',
  textAlign: 'center',
  paddingLeft: '4px',
  paddingRight: '4px',
  fontSize: '11px',
  textTransform: 'capitalize',
};

// const boldStyle = {
//   fontWeight: 'bold',
// };

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
  aTrip: PropTypes.object.isRequired,
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
//   reportFrame: PropTypes.object.isRequired,
// };


class UglyTable extends React.Component {
  render() {
    const { translations } = this.props;
    const reportFrame = this.props.getSoloReportById(this.props.vehicleId);
    if (reportFrame === null
      || reportFrame.getValidTrips().length < 1) {
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
              <TableHeaderColumn style={cellStyle}>{ translations.rest_duration }</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>{ translations.start }</TableHeaderColumn>
              <TableHeaderColumn style={nameCellStyle}>{ translations.from }</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>{ translations.end }</TableHeaderColumn>
              <TableHeaderColumn style={nameCellStyle}>{ translations.to }</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>{ translations.operation_duration }</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>{ translations.idle }</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>{ translations.distance }</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>{ translations.max_speed }</TableHeaderColumn>
              <TableHeaderColumn style={cellStyle}>{ translations.average_speed }</TableHeaderColumn>
              {hasT &&
                <TableHeaderColumn style={cellStyle}>{ translations.max_temp }</TableHeaderColumn>
              }
              {hasT &&
                <TableHeaderColumn style={cellStyle}>{ translations.min_temp }</TableHeaderColumn>
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
  vehicleId: PropTypes.string.isRequired,
  getSoloReportById: PropTypes.func.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(translate(phrases)(UglyTable)));
