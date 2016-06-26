import Book from './spreadsheetGenerator';

export function prepareDataForReport({ reports, vehiclesCount, daysCount }) {
  const result = [];

  for (let i = 0; i < vehiclesCount; i++) {
    for (let j = 0; j < daysCount; j++) {
      const vehiceMileage = mileageData[i];
      const date = new Date(vehiceMileage.reportRecords[j].time).toLocaleDateString();

      let recordRow = [
        vehiceMileage.vehicle.name, // vehicle name
        date, // date
        vehiceMileage.reportRecords[j].distance.toFixed(4), // distance for the date
      ];

      const vehicleTempColumns = _computeTemperatureForDate(tempData[i].reportRecords, date);

      recordRow = recordRow.concat(vehicleTempColumns);

      result.push(recordRow);
    }
  }

  return Promise.resolve(result);
}

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

/**
 * Compute temperature data for specified date
 * Basically it goes through all vehicleTempRecords
 * and get records only for that date
 * data = new Date().toLocaleDateString()
 */
function _computeTemperatureForDate(vehicleTempRecords = [], date) {
  const result = [];

  // if no data for the day return N/A
  if (vehicleTempRecords.length === 0) {
    result.push('N/A', 'N/A', 'N/A');
    return result;
  }

  // assume a[0] has minimum temp
  // and a[latest] has max temp
  let maxTemp = vehicleTempRecords[0].temp;
  let minTemp = vehicleTempRecords[vehicleTempRecords.length - 1].temp;

  // temporary variable
  let temp;

  // swap max and min temp
  if (minTemp > maxTemp) {
    temp = maxTemp;
    maxTemp = minTemp;
    minTemp = temp;
  }

  // search for max and min temeratures
  for (let i = 0; i < vehicleTempRecords.length; i++) {
    const recordTime = new Date(vehicleTempRecords[i].time);

    if (recordTime.toLocaleDateString() !== date) continue;

    const t = vehicleTempRecords[i].temp;

    if (t < minTemp) {
      minTemp = t;
    } else if (t > maxTemp) {
      maxTemp = t;
    }
  }

  const averageTemp = (maxTemp + minTemp) / 2;

  result.push(maxTemp, minTemp, averageTemp);

  return result;
}

export default {
  createReport,
  prepareDataForReport,
};
