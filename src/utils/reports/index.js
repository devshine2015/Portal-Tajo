import Book from './spreadsheetGenerator';

export function createReport(vehiclesReportData, headers, options) {
  // Here the data we can output now
  // Presented in order of vehiclesReportData data
  const b = new Book(headers, vehiclesReportData, options);
  b.createBook();

  return Promise.resolve(vehiclesReportData);
}

export default createReport;
