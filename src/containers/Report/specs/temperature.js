import moment from 'moment';

/**
 *
 * Calculate min/max/avg temperature for given date at once
 * for all vehiclesReports
 *
 * saves results for each vehicle for futher reusing
 *
 * return array of values for given selectedTypes
 *
 **/
function calcTemperature(records, { selectedTypes, period, frequency }) {
  const calcToReturn = (resultTemps) =>
    selectedTypes.map((key) => resultTemps[key]);

  const withinPeriod = (time) =>
    moment(time).isBetween(period.start, period.end);

  let resultTemps = {
    minTemp: 'n/a',
    maxTemp: 'n/a',
    avgTemp: 'n/a',
  };

  if (records.length === 0) {
    return calcToReturn(resultTemps);
  }


  let minTemp = records[0].temp;
  let maxTemp = records[0].temp;
  let temps = 0;
  let tempsCounter = 0;

  for (let i = 0; i < records.length; i++) {
    const record = records[i];

    if (frequency && !withinPeriod(record.time)) {
      continue;
    }

    temps += record.temp;
    tempsCounter++;

    if (record.temp < minTemp) {
      minTemp = record.temp;
    } else {
      maxTemp = record.temp;
    }
  }

  const avgTemp = (temps / tempsCounter).toFixed(4, 10);

  resultTemps = {
    minTemp,
    maxTemp,
    avgTemp,
  };

  return calcToReturn(resultTemps);
}

function filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['minTemp', 'maxTemp', 'avgTemp'];

  return allSelectedReportTypes.filter(type => similarTypes.indexOf(type) !== -1);
}

const commonProps = {
  endpoint: 'report/temperature',
  query: {
    downsampleSec: 30,
  },
  domain: 'temperature',
  checkedByDefault: false,
  filterSimilar,
  calc: calcTemperature,
};

const fields = [{
  ...commonProps,
  label: 'Min. Temperature',
  name: 'minTemp',
  reportType: 'minTemp',
  order: 4,
}, {
  ...commonProps,
  label: 'Max. Temperature',
  name: 'maxTemp',
  reportType: 'maxTemp',
  order: 5,
}, {
  ...commonProps,
  label: 'Average Temperature',
  name: 'avgTemp',
  reportType: 'avgTemp',
  order: 6,
}];

export default fields;
