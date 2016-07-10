/*
 * Calculate mileage for the whole period.
 * NOT USED FREQUENCY CONCEPTION.
 */
function _calc(records) {
  let totalDistance = 0;

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    totalDistance += parseFloat(record.distance, 10);
  }

  return totalDistance.toFixed(3);
}

const fields = [{
  label: 'Driving Distance (on daily basis)',
  name: 'mileage',
  reportType: 'mileage',
  endpoint: 'report/mileage',
  domain: 'mileage',
  checkedByDefault: false,
  order: 3,
  calc: _calc,
}];

export default fields;
