import moment from 'moment';
import endpoints from 'configs/endpoints';
import specsUtils from '../utils/specsUtils';

function formatValue(v) {
  if (!v) return '';

  const d = moment.duration(v, 'seconds');
  const h = d.get('hours');
  const m = d.get('minutes');
  const s = d.get('seconds');

  return `${h}h ${m}m ${s}s`;
}

function _calc(record, { selectedTypes }) {
  return specsUtils.calcToReturn({
    // stoppedTime: formatValue(record.stoppedTime),
    idleWhileStopped: formatValue(record.idleWhileStopped),
    ignOn: formatValue(record.ignOn),
    drivingTime: formatValue(record.drivingTime),
  }, selectedTypes);
}

function _filterSimilar(allSelectedReportTypes) {
  const similarTypes = [
    'ignOn', // 1
    // 'stoppedTime', // 2.1
    'idleWhileStopped', // 2.1
    'nonIdleWhileStopped', // 2.2
    'drivingTime', // 3
  ];

  return specsUtils.filterSimilar(allSelectedReportTypes, similarTypes);
}

const commonFields = {
  endpoint: endpoints.idlingReport.url,
  checkedByDefault: false,
  domain: 'idling',
  query: {
    tzoffset: new Date().getTimezoneOffset(),
  },
  filterSimilar: _filterSimilar,
  calc: _calc,
};

const fields = [{
  ...commonFields,
  reportType: 'idleWhileStopped',
  label: 'Idling Time',
  name: 'idleWhileStopped',
  order: 7,
}, /* {
  ...commonFields,
  reportType: 'stoppedTime',
  label: 'Stopped Time',
  name: 'stoppedTime',
  order: 7,
}, */ {
  ...commonFields,
  reportType: 'drivingTime',
  label: 'Driving Time',
  name: 'drivingTime',
  order: 8,
}, {
  ...commonFields,
  reportType: 'ignOn',
  label: 'Ignition On Time',
  name: 'ignOn',
  order: 9,
}];

export default fields;
