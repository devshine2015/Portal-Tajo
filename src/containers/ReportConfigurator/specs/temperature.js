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
function calcTemperature({ records, frequency, selectedTypes, period }) {
  const calcToReturn = (resultTemps) => (
    selectedTypes.map((key) => resultTemps[key])
  );

  const isSamePeriod = (time) => {
    const differ = frequency === 'daily' ? 'day' : 'hour';

    return moment(period).isSame(moment(time), differ);
  };

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

    if (!isSamePeriod(record.time)) continue;

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

const fields = [{
  label: 'Min. Temperature',
  name: 'minTemp',
  endpoint: 'temperature',
  reportType: 'minTemp',
  order: 3,
  query: 'downsampleSec=0',
  domain: 'temperature',
  filterSimilar,
  calc: calcTemperature,
}, {
  label: 'Max. Temperature',
  name: 'maxTemp',
  endpoint: 'temperature',
  reportType: 'maxTemp',
  order: 4,
  query: 'downsampleSec=0',
  domain: 'temperature',
  filterSimilar,
  calc: calcTemperature,
}, {
  label: 'Average Temperature',
  name: 'avgTemp',
  endpoint: 'temperature',
  reportType: 'avgTemp',
  order: 5,
  query: 'downsampleSec=0',
  domain: 'temperature',
  filterSimilar,
  calc: calcTemperature,
}];

export default fields;
