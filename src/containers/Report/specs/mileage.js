/*
 * Calculate mileage for the whole period.
 * NOT USED FREQUENCY CONCEPTION.
 */
const _calc = record =>
  record.distance !== undefined ? record.distance.toFixed(3, 10) : 0;

const fields = [{
  label: 'Driving Distance (km.)',
  name: 'mileage',
  reportType: 'mileage',
  endpoint: 'report/mileage',
  domain: 'mileage',
  checkedByDefault: false,
  order: 3,
  query: {
    tzoffset: new Date().getTimezoneOffset(),
  },
  calc: _calc,
}];

export default fields;
