const fields = [{
  label: 'Driving Distance',
  name: 'mileage',
  reportType: 'mileage',
  endpoint: 'mileage',
  domain: 'mileage',
  order: 2,
  calc: ({ records }) => records[0].distance.toFixed(3, 10),
}];

export default fields;
