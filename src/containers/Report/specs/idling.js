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
    idlingTime: formatValue(record.ignOnWhileStopped + record.ignOffWhileStopped),
    ignOnWhileStopped: formatValue(record.ignOnWhileStopped),
    ignOffWhileStopped: formatValue(record.ignOffWhileStopped),
    ignOn: formatValue(record.ignOn),
    drivingTime: formatValue(record.drivingTime),
  }, selectedTypes);
}

function _filterSimilar(allSelectedReportTypes) {
  const similarTypes = [
    // 'stopPeriod', // ?
    'ignOn', // 1
    'idlingTime', // 2 = 2.1 + 2.2
    'ignOffWhileStopped', // 2.1
    'ignOnWhileStopped', // 2.2
    'drivingTime', // 3
  ];

  return specsUtils.filterSimilar(allSelectedReportTypes, similarTypes);
}

const commonFields = {
  endpoint: endpoints.idlingReport.url,
  checkedByDefault: false,
  domain: 'idling',
  query: {
    // for reports tzoffset is required by backend.
    tzoffset: 0,
  },
  filterSimilar: _filterSimilar,
  calc: _calc,
};

const fields = [{
  ...commonFields,
  reportType: 'idlingTime',
  name: 'idlingTime',
  help: 'Ignition On While Stopped + Ignition Off While Stopped',
  order: 7,
}, {
  ...commonFields,
  reportType: 'ignOnWhileStopped',
  name: 'ignOnWhileStopped',
  help: 'Ignition On and speed = 0',
  order: 8,
}, {
  ...commonFields,
  reportType: 'ignOffWhileStopped',
  name: 'ignOffWhileStopped',
  help: 'Ignition Off and speed = 0',
  order: 9,
}, {
  ...commonFields,
  reportType: 'drivingTime',
  name: 'drivingTime',
  order: 10,
}, {
  ...commonFields,
  reportType: 'ignOn',
  name: 'ignOn',
  order: 11,
}];

export default fields;
