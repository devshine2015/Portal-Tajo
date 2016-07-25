/*
 * Calculate mileage for the whole period.
 * NOT USED FREQUENCY CONCEPTION.
 */
function _calc(records) {
  return records.distance !== undefined ? records.distance : 0;
}

const fields = [{
  label: 'Driving Distance (on daily basis)',
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
