function _formateDateForTable({ start, end }, frequency, dateFormat) {
  const startFormat = !frequency || frequency === 'daily' ? dateFormat : 'L LT';
  const endFormat = !frequency || frequency === 'daily' ? dateFormat : 'LT';
  let formattted;

  if (!frequency && end.isSame(start, 'days')) {
    formattted = start.format(startFormat);
  } else {
    formattted = `${start.format(startFormat)} - ${end.format(endFormat)}`;
  }

  return formattted;
}

function _calculate(vehicle, { selectedTypes, period, frequency, dateFormat }) {
  const calcToReturn = (resultTemps) =>
    selectedTypes.map((key) => resultTemps[key]);

  return calcToReturn({
    date: _formateDateForTable(period, frequency, dateFormat),
    vehicles: vehicle.name,
    license: vehicle.licensePlate,
  });
}

function filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['date', 'vehicles', 'license'];

  return allSelectedReportTypes.filter(type => similarTypes.indexOf(type) !== -1);
}

const fields = [{
  label: 'Date',
  name: 'date',
  reportType: 'date',
  checkedByDefault: true,
  domain: 'base',
  order: 0,
  filterSimilar,
  calc: _calculate,
}, {
  label: 'Vehicle Name',
  name: 'name',
  reportType: 'vehicles',
  checkedByDefault: true,
  domain: 'base',
  order: 1,
  filterSimilar,
  calc: _calculate,
}, {
  label: 'License Plate',
  name: 'license',
  reportType: 'license',
  checkedByDefault: false,
  domain: 'base',
  order: 2,
  filterSimilar,
  calc: _calculate,
}];

export default fields;
