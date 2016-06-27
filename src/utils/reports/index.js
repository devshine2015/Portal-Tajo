import Book from './spreadsheetGenerator';

export function createReport(vehiclesReportData) {
  // Here the data we can output now
  // Presented in order of vehiclesReportData data
  const headers = [
    'Vehicle name',
    'Date',
    'Driving Distance',
    'Max Temp.',
    'Min Temp.',
    'Average Temp.',
  ];
  const b = new Book(headers, vehiclesReportData);
  b.createBook();

  return Promise.resolve(vehiclesReportData);
}

export default createReport;
