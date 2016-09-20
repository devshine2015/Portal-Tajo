import moment from 'moment';
import endpoints from 'configs/endpoints';

function formatValue(v) {
  const d = moment.duration(v, 'seconds');
  const h = d.get('hours');
  const m = d.get('minutes');
  const s = d.get('seconds');

  return `${h}h ${m}m ${s}s`;
}

function _calc(record, { selectedTypes }) {
  const calcToReturn = (result) =>
    selectedTypes.map((key) => result[key]);

  return calcToReturn({
    stoppedTime: formatValue(record.stoppedTime),
    idleWhileStopped: formatValue(record.idleWhileStopped),
  });
}

function filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['stoppedTime', 'idleWhileStopped'];

  return allSelectedReportTypes.filter(type => similarTypes.indexOf(type) !== -1);
}

const commonFields = {
  endpoint: endpoints.idlingReport.url,
  checkedByDefault: false,
  domain: 'idling',
  query: {
    tzoffset: new Date().getTimezoneOffset(),
  },
  filterSimilar,
  calc: _calc,
};

const fields = [{
  ...commonFields,
  reportType: 'stoppedTime',
  label: 'Stopped Time',
  name: 'stoppedTime',
  order: 7,
}, {
  ...commonFields,
  reportType: 'idleWhileStopped',
  label: 'Idling Time',
  name: 'idleWhileStopped',
  order: 8,
}];

export default fields;
