import Book from 'utils/reports/spreadsheetGenerator';
import { metersToKmString, speedToString, msToTimeIntervalString,
  dateToHHMM } from 'utils/convertors';

export default function generatReportSpreadsheet(reportFrame, theVehicl, options) {
  const reportData = reportFrame.getValidTrips().map(aTrip => makeDataRow(aTrip));
  const b = new Book(getColumns(), reportData, { fileName: `${options.fileName}Trips` });
  b.createBook();
  const bTotal = new Book(getColumnsTotals(), getDataTotals(reportFrame), { fileName: `${options.fileName}Totals` });
  bTotal.createBook();
}

const getColumns = function () {
  return [
    // -----
    'Rest\nDuration',
    'Start',
    'From',
    'End',
    'To',
    'Operation\nDuration',
    'Idle',
    'Dist',
    'MaxV',
    'AvgV',
  ];
};

const makeDataRow = aTrip => (
  [
    // // -------
    msToTimeIntervalString(aTrip.fromStopOwer.durationMs),
    dateToHHMM(aTrip.startDate),
    aTrip.fromStopOwer.address,
    dateToHHMM(aTrip.endDate),
    aTrip.toStopOver.address,
    msToTimeIntervalString(aTrip.calculatedOperationalDurationMs),
    msToTimeIntervalString(aTrip.calculatedIdleDurationMs),
    metersToKmString(aTrip.calculatedDistanceM),
    speedToString(aTrip.maxSpeed),
    speedToString(aTrip.avgSpeed),
  ]
);

//
// --------------------------------------------------

const getColumnsTotals = function () {
  return [
    // -----
    'Date',
    'Rest\nDuration',
    'Operation\nDuration',
    'Idle',
    'Dist',
  ];
};

const makeDataRowTotals = aTotal => (
  [
    // // -------
    aTotal.dateMoment !== undefined ? aTotal.dateMoment.toDate().toLocaleDateString() : 'Grand Total',
    msToTimeIntervalString(aTotal.calculatedRestMs),
    msToTimeIntervalString(aTotal.calculatedOperationalDurationMs),
    msToTimeIntervalString(aTotal.calculatedIdleDurationMs),
    metersToKmString(aTotal.calculatedDistanceM),
  ]
);

const getDataTotals = (reportFrame) => {
  const totalsData = reportFrame.perDayTotals.map(aTrip => makeDataRowTotals(aTrip));
  totalsData.push(makeDataRowTotals(reportFrame.grandTotal));
  return totalsData;
};
