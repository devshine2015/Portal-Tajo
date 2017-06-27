// require('excel-builder');
// import FileSaver from 'file-saver';
// require('utils/excel/sheetjs.all.min');
// require('utils/excel/excelplus-2.3.min');

function Book(headers = [], data = [], {
  fileName = 'Sheet1',
  fileType = 'csv',
} = {}) {
  this.headers = headers;
  this.rowData = data;
  this.fileName = fileName;
  this.fileType = `text/${fileType};charset=UTF-8`;
}

/**
 * Main function
 */
Book.prototype.createBook = function () {
  let bookData = '';

  bookData = this.addHeaders(this.headers, true);

  this.rowData.forEach(data => {
    // const row = this.mapRecordsToString(data);
    const row = _addRow(data);
    bookData = bookData.concat(row);
  });

  this.download(bookData);
};

/**
 * Generate file out of data and download it
 */
Book.prototype.download = function (data = '') {
  /**
   * prepend BOM special character to tell excel to read
   * document in UTF-8 encoding.
   * @see https://docs.microsoft.com/en-us/scripting/javascript/advanced/special-characters-javascript
   * @see https://stackoverflow.com/questions/17879198/adding-utf-8-bom-to-string-blob
   */
  const excelReadable = ['\ufeff', data];
  const file = new Blob(excelReadable, { type: this.fileType });

  const url = window.URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.style = 'hidden';
  link.download = `${this.fileName}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Add headers to file
 */
Book.prototype.addHeaders = (headers = [], asString = false) => {
  if (!asString) {
    return headers;
  }

  return _addRow(headers);
};

/**
 * Map array to string rows
 */
Book.prototype.mapRecordsToString = (data = []) => {
  let rows = '';

  data.reportRecords.forEach(record => {
    rows += `${data.vehicle.name},`;
    rows += `${new Date(record.time).toLocaleDateString()},`;
    rows += `${record.distance.toFixed(2)}`;

    rows += '\r\n';
  });

  return rows;
};

/**
 * Create [[a,b,c,],[...]]
 */
Book.prototype.mapRecordsToArray = (data = []) => {
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
};

function _addRow(array = []) {
  let row = '';

  array.forEach(el => {
    row += el !== undefined ? `${JSON.stringify(el).replace(/\\n/g, '\\n')},` : '';
  });

  // remove last comma
  row = row.slice(0, -1);
  row += '\r\n';

  return row;
}

export default Book;
