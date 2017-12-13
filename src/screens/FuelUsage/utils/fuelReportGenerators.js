import Book from 'utils/reports/spreadsheetGenerator';
import moment from 'moment';

import { summarizeFuelAlerts } from './alertsSummaryHelper';

const generateFuelRaw = fuelReport => Object.entries(fuelReport.series)
  .sort((a, b) => moment(a[0]).valueOf() < moment(b[0]).valueOf() ? -1 : 1)
  .map(aData => [moment(aData[0]).format('DD-MM-YYYY HH:mm:ss'), aData[1]]);

export const doSaveSpreadSheetSeries = (theVehicle, fuelReport, timeRange) => {
  const fileName = `fuel_history_${theVehicle.original.name}_${moment(timeRange.fromDate).format('DD-MM-YYYY')}_${moment(timeRange.toDate).format('DD-MM-YYYY')}`;
  const book = new Book(['time', 'fuel, ltr'],
    generateFuelRaw(fuelReport),
    { fileName });
  book.createBook();
};

// ------  overview ------
//
const makeOverviewTableWithHeaders = (theVehicle, fuelReport, alertsSummary) =>
  [['Tank Capacity, Ltr', !!theVehicle.original.fuelCapacity ? theVehicle.original.fuelCapacity : 'n/a'],
    ['Total Fuel Concumption, Ltr', fuelReport.totalConsumption],
    ['Liters per Km', fuelReport.ltrPerKm],
    ['Total Distance, Km', fuelReport.totalDist],
    ['Speed Avg, Km/h', fuelReport.avgSpeed],
    ['Number of Fuel Loss Alerts', alertsSummary.lossCount],
    ['Estimated Fuel Loss, Ltr', alertsSummary.lossAmount],
    ['Estimated Fuel Loss, %', alertsSummary.lossPerc],
    ['Number of Refuel Alerts', alertsSummary.gainCount],
    ['Estimated Refuel, Ltr', alertsSummary.gainAmount],
    ['Estimated Refuel, %', alertsSummary.gainPerc],
  ];

export const doSaveSpreadSheetOverview = (theVehicle, fuelReport, timeRange) => {
  const alertsSummary = summarizeFuelAlerts(fuelReport.alerts, fuelReport.totalConsumption);

  const theTableHeaderAndData = makeOverviewTableWithHeaders(theVehicle, fuelReport, alertsSummary);

  const fileName = `fuel_overview_${theVehicle.original.name}_${moment(timeRange.fromDate).format('DD-MM-YYYY')}_${moment(timeRange.toDate).format('DD-MM-YYYY')}`;
  const book = new Book(theTableHeaderAndData.map(aData => aData[0]),
    [theTableHeaderAndData.map(aData => aData[1])],
    { fileName });
  book.createBook();
};
