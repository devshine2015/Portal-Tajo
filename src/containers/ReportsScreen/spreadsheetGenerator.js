// require('xlsx');
// import { saveAs } from 'file-saver';

function _mapRecordsToRows(data) {
  const rows = [];

  data.reportRecords.forEach(record => {
    // push data in order with headers
    rows.push([
      data.vehicle.name,
      record.time,
      record.distance,
    ]);
  });

  return rows;
}

function _addHeaderColumn(array, newHeaders = []) {
  array[0].concat(newHeaders);
}

function _createBook(headers = [], rows = []) {
  const sheetName = 'Sheet1';
  let bookData = headers;

  rows.forEach(data => {
    const row = _mapRecordsToRows(data);
    bookData = bookData.concat(row);
  });

  console.log(bookData);
}

export default _createBook;
