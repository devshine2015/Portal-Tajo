const fields = [{
  label: 'Driving Distance',
  name: 'mileage',
  reportType: 'mileage',
  endpoint: 'mileage',
  domain: 'mileage',
  checkedByDefault: false,
  order: 3,
  calc: (records) => records[0].distance.toFixed(3, 10),
}];

export default fields;
