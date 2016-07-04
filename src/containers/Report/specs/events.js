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

  const isNeeded = (eventType, neededEventType, neededType) =>
    eventType === neededEventType && selectedTypes.indexOf(neededType) !== -1;

  const result = {};

  const ignitionOnType = 'timeIgnitionOn';
  const idlingTimeType = 'idlingTime';

  const ignitionOffEvent = 'vehicle-ign-off';
  const idlingTimeEvent = 'vehicle-stop-stats';

  let totalTimeIgnitionOn = 0;
  let totalIdlingTime = 0;

  events.forEach(event => {
    if (isNeeded(event.type, ignitionOffEvent, ignitionOnType)) {
      totalTimeIgnitionOn += event.ev.ignitionOnPeriod;
    }

    if (isNeeded(event.type, idlingTimeEvent, idlingTimeType)) {
      totalIdlingTime += event.ev.ignitionOnPeriod;
    }
  });

  result[ignitionOnType] = _getTime(totalTimeIgnitionOn);
  result[idlingTimeType] = _getTime(totalIdlingTime);

  return calcToReturn(result);
}

function filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['timeIgnitionOn', 'idlingTime'];

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
}, {
  label: 'Idling Time',
  name: 'idlingTime',
  reportType: 'idlingTime',
  checkedByDefault: false,
  domain: 'ignition',
  endpoint: 'events',
  order: 0,
  filterSimilar,
  calc: _calculate,
}];

export default fields;
