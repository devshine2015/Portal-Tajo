//
// one vehicle report table
// PDF generation
//
import { metersToKmString, speedToString, msToTimeIntervalString,
  dateToHHMM } from 'utils/convertors';


const jsPDF = require('jspdf');
require('jspdf-autotable');

export default function generatReportPDF(reportFrame, reportNode) {
  // const columns = getColumns();
  // const rows = getData(reportFrame);
  const doc = new jsPDF('l');

  doc.text(`Report from ${reportFrame.dateFrom.toLocaleString()} to ${reportFrame.dateTo.toLocaleString()} `, 7, 15);
  doc.text("Per-Trip Report", 7, 25);

  doc.autoTable(getColumns(), getData(reportFrame), {
    // startY: doc.autoTable.previous.finalY + 1,
    startY: 32,
    margin: { horizontal: 7 },
    bodyStyles: { valign: 'top' },
    styles: { overflow: 'linebreak', columnWidth: 'wrap' },
    columnStyles: { text: { columnWidth: 'auto' } },
    showHeader: 'firstPage',
    tableWidth: 'auto',
  });

  doc.text("Per-Day Report", 7, doc.autoTable.previous.finalY + 15);
  // doc.text("Per-Day Report", 7, doc.autoTable.previous.finalY + 15);

  doc.autoTable(getColumnsTotals(), getDataTotals(reportFrame), {
    startY: doc.autoTable.previous.finalY + 35,
    margin: { horizontal: 7 },
    bodyStyles: { valign: 'top' },
    styles: { overflow: 'linebreak', columnWidth: 'wrap' },
    columnStyles: { text: { columnWidth: 'auto' } },
    showHeader: 'firstPage',
  });


  doc.save('tripReport.pdf');
}

const breakLongString = (inString, breakLimit) => {
  let dstString = '';
  let thisLineCount = 0;
  for (let i = 0; i < inString.length; ++i) {
    if (thisLineCount > breakLimit && inString[i] === ' ') {
      thisLineCount = 0;
      dstString = dstString.concat('\n');
    } else {
      ++thisLineCount;
      dstString = dstString.concat(inString[i]);
    }
  }
  return dstString;
};

const getColumns = function () {
  return [
    // -----
        { title: 'Rest\nDuration', dataKey: 'restDuration' },
        { title: 'Start', dataKey: 'start' },
        { title: 'From', dataKey: 'from' },
        { title: 'End', dataKey: 'end' },
        { title: 'To', dataKey: 'to' },
        { title: 'Operation\nDuration', dataKey: 'operation' },
        { title: 'Idle', dataKey: 'idle' },
        { title: 'Dist', dataKey: 'dist' },
        { title: 'MaxV', dataKey: 'maxV' },
        { title: 'AvgV', dataKey: 'avgV' },
  ];
};

const makeDataRow = aTrip => (
  {
    // // -------
    restDuration: msToTimeIntervalString(aTrip.fromStopOwer.durationMs),
    start: dateToHHMM(aTrip.startDate),
    from: breakLongString(aTrip.fromStopOwer.address, 20),
    // from: 'Tenetur perspiciatis fuga et distinctio in fugiat aspernatur amet voluptas corrupti qui et animi tempore asperiores maxime nobis eos rerum',
    end: dateToHHMM(aTrip.endDate),
    to: breakLongString(aTrip.toStopOver.address, 20),
    operation: msToTimeIntervalString(aTrip.calculatedOperationalDurationMs),
    idle: msToTimeIntervalString(aTrip.calculatedIdleDurationMs),
    dist: metersToKmString(aTrip.calculatedDistanceM),
    maxV: speedToString(aTrip.maxSpeed),
    avgV: speedToString(aTrip.avgSpeed),
  }
);

const getData = reportFrame =>
  reportFrame.getValidTrips().map(aTrip => makeDataRow(aTrip));


// ------ TOTALS -----

const getColumnsTotals = function () {
  return [
    // -----
        { title: 'Date', dataKey: 'date' },
        { title: 'Rest\nDuration', dataKey: 'restDuration' },
        { title: 'Operation\nDuration', dataKey: 'operation' },
        { title: 'Idle', dataKey: 'idle' },
        { title: 'Dist', dataKey: 'dist' },
  ];
};

const makeDataRowTotals = aTotal => (
  {
    // // -------
    date: aTotal.dateMoment !== undefined ? aTotal.dateMoment.toDate().toLocaleDateString() : 'Grand Total',
    restDuration: msToTimeIntervalString(aTotal.calculatedRestMs),
    operation: msToTimeIntervalString(aTotal.calculatedOperationalDurationMs),
    idle: msToTimeIntervalString(aTotal.calculatedIdleDurationMs),
    dist: metersToKmString(aTotal.calculatedDistanceM),
  }
);

const getDataTotals = (reportFrame) => {
  const totalsData = reportFrame.perDayTotals.map(aTrip => makeDataRowTotals(aTrip));
  totalsData.push(makeDataRowTotals(reportFrame.grandTotal));
  return totalsData;
}
