import moment from 'moment';

const calculatedRecords = {};

function getFromSaved(date, tempType) {
  return tempType ? calculatedRecords[date][tempType] : calculatedRecords;
}

/**
 *
 * save values into map:
 * <date_as_ISO_string> : <type_of_value> : [values]
 *
 * Example:
 * 2016-06-06T00:00:00.000+0000: {
 *  minTemp: [-0.2, 3, -87, ...],
 *  maxTemp: [22, 11, 33, ...],
 *  avgTemp: [...],
 * }
 *
 * Amount of <values> equal to vehicles count in <vehiclesReports>.
 * Thus, lengths of minTemp, maxTemp, and avgTemp arrays are equal;
 *
 **/
function saveResult(date, values = {}) {
  Object.keys(values).forEach(type => {
    if (!calculatedRecords[date]) {
      calculatedRecords[date] = {};
    }
    if (!calculatedRecords[date][type]) {
      calculatedRecords[date][type] = [];
    }

    calculatedRecords[date][type].push(values[type]);
  });
}

/**
 *
 * Calculate min/max/avg temperature for given date at once
 * for all vehiclesReports
 *
 * saves results for each vehicle for futher reusing
 *
 * return array of values for given typeToReturn
 *
 **/
function calcTemperature(vehiclesReports, date, typeToReturn) {
  const r = vehiclesReports.map(({ reportRecords }) => {
    let resultTemps = {
      minTemp: 'n/a',
      maxTemp: 'n/a',
      avgTemp: 'n/a',
    };

    if (reportRecords.length === 0) {
      saveResult(date, resultTemps);
      return resultTemps[typeToReturn];
    }


    let minTemp = reportRecords[0].temp;
    let maxTemp = reportRecords[0].temp;
    let temps = 0;
    let tempsCounter = 0;

    for (let i = 0; i < reportRecords.length; i++) {
      const record = reportRecords[i];

      if (!moment(date).isSame(moment(record.time), 'day')) continue;

      temps += record.temp;
      tempsCounter++;

      if (record.temp < minTemp) {
        minTemp = record.temp;
      } else {
        maxTemp = record.temp;
      }
    }

    const avgTemp = temps / tempsCounter;

    resultTemps = {
      minTemp,
      maxTemp,
      avgTemp,
    };

    saveResult(date, resultTemps);

    return resultTemps[typeToReturn];
  });

  return r;
}

/**
 * we can get calculated data for same date
 **/
const getTemperature = ({ records, useSaved, date }, tempType) => {
  if (useSaved) {
    return getFromSaved(date, tempType);
  }

  return calcTemperature(records, date, tempType);
};

const fields = [{
  label: 'Min. Temperature',
  name: 'minTemp',
  endpoint: 'temperature',
  reportType: 'minTemp',
  order: 3,
  query: 'downsampleSec=0',
  calc: (params = {}) =>
    getTemperature(params, 'minTemp'),
}, {
  label: 'Max. Temperature',
  name: 'maxTemp',
  endpoint: 'temperature',
  reportType: 'maxTemp',
  order: 4,
  query: 'downsampleSec=0',
  calc: (params = {}) =>
    getTemperature(params, 'maxTemp'),
}, {
  label: 'Average Temperature',
  name: 'avgTemp',
  endpoint: 'temperature',
  reportType: 'avgTemp',
  order: 5,
  query: 'downsampleSec=0',
  calc: (params = {}) =>
    getTemperature(params, 'avgTemp'),
}];

export default fields;
