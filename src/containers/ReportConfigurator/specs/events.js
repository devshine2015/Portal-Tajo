const h = 1000 * 60 * 60;
const m = 1000 * 60;
const s = 1000;

// returns hh, mm, ss
function _getTime(ms) {
  const hours = parseInt(ms / h, 10);
  ms = ms - (h * hours);
  const minutes = parseInt(ms / m, 10);
  ms = ms - (m * minutes);
  const seconds = ms / s;

  return `${hours}h ${minutes}m ${seconds}s`;
}

function _calculate(events, { selectedTypes }) {
  const calcToReturn = (result) =>
    selectedTypes.map((key) => result[key]);

  const isNeeded = (type) =>
    selectedTypes.indexOf(type) !== -1;

  const result = {};
  const ignitionOnType = 'timeIgnitionOn';

  if (isNeeded(ignitionOnType)) {
    const ignitionOffEvent = 'vehicle-ign-off';

    const ignitionOffEvents = events.filter(e => e.type === ignitionOffEvent);

    let timeIgnitionOn = 0;

    ignitionOffEvents.forEach(({ ev }) => {
      if (!ev.hasOwnProperty('ignitionOnPeriod')) return;

      timeIgnitionOn += ev.ignitionOnPeriod;
    });

    result[ignitionOnType] = _getTime(timeIgnitionOn);
  }

  return calcToReturn(result);
}

function filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['timeIgnitionOn'];

  return allSelectedReportTypes.filter(type => similarTypes.indexOf(type) !== -1);
}

const fields = [{
  label: 'Ignition on Time',
  name: 'timeIgnitionOn',
  reportType: 'timeIgnitionOn',
  checkedByDefault: false,
  domain: 'ignition',
  endpoint: 'events',
  order: 0,
  filterSimilar,
  calc: _calculate,
}];

export default fields;
