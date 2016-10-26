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
    tzoffset: new Date().getTimezoneOffset(),
  },
  filterSimilar: _filterSimilar,
  calc: _calc,
};

const fields = [{
  ...commonFields,
  reportType: 'idlingTime',
  label: 'Idling Time',
  name: 'idlingTime',
  order: 7,
}, {
  ...commonFields,
  reportType: 'ignOnWhileStopped',
  label: 'Ignition On While Stopped',
  name: 'ignOnWhileStopped',
  order: 8,
}, {
  ...commonFields,
  reportType: 'ignOffWhileStopped',
  label: 'Ignition Off While Stopped',
  name: 'ignOffWhileStopped',
  order: 9,
}, {
  ...commonFields,
  reportType: 'drivingTime',
  label: 'Driving Time',
  name: 'drivingTime',
  order: 10,
}, {
  ...commonFields,
  reportType: 'ignOn',
  label: 'Ignition On Time',
  name: 'ignOn',
  order: 11,
}];

export default fields;
