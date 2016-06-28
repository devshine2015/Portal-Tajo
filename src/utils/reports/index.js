import Book from './spreadsheetGenerator';

export function createReport(vehiclesReportData, headers) {
  // Here the data we can output now
  // Presented in order of vehiclesReportData data
  const b = new Book(headers, vehiclesReportData);
  b.createBook();

  return Promise.resolve(vehiclesReportData);
}

export default createReport;
