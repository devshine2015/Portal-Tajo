function calculate(records, field) {
  return records[field];
}

const fields = [{
  label: 'Vehicle Name',
  name: 'name',
  reportType: 'vehicles',
  domain: 'base',
  order: 0,
  calc: calculate,
}, {
  label: 'License Plate',
  name: 'license',
  reportType: 'license',
  domain: 'base',
  order: 1,
  calc: calculate,
}];

export default fields;
