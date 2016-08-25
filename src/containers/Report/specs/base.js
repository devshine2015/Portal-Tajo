function _formateDateForTable({ start, end }, frequency) {
  const startFormat = !frequency || frequency === 'daily' ? 'L' : 'L LT';
  const endFormat = !frequency || frequency === 'daily' ? 'L' : 'LT';
  let formattted;

  if (!frequency && end.isSame(start, 'days')) {
    formattted = start.format(startFormat);
  } else {
    formattted = `${start.format(startFormat)} - ${end.format(endFormat)}`;
  }

  return formattted;
}

function _calculate(vehicle, { selectedTypes, period, frequency }) {
  const calcToReturn = (resultTemps) =>
    selectedTypes.map((key) => resultTemps[key]);
  const hasOdo = vehicle.odometer && vehicle.odometer.value !== '';

  return calcToReturn({
    date: _formateDateForTable(period, frequency),
    vehicles: JSON.stringify(vehicle.name),
    license: JSON.stringify(vehicle.licensePlate),
    odometer: hasOdo ? vehicle.odometer.value : 'n/a',
  });
}

function filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['date', 'vehicles', 'license', 'odometer'];

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
}, {
  label: 'ODO',
  name: 'odometer',
  reportType: 'odometer',
  checkedByDefault: false,
  domain: 'base',
  order: 9,
  filterSimilar,
  calc: _calculate,
}];

export default fields;
