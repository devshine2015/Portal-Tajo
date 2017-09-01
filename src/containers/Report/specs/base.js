import specsUtils from '../utils/specsUtils';

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
  return specsUtils.calcToReturn({
    date: _formateDateForTable(period, frequency, dateFormat),
    name: vehicle.original.name,
    license: vehicle.original.licensePlate,
  }, selectedTypes);
}

function _filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['date', 'name', 'license'];

  return specsUtils.filterSimilar(allSelectedReportTypes, similarTypes);
}

const commonProps = {
  domain: 'base',
  checkedByDefault: true,
  filterSimilar: _filterSimilar,
  calc: _calculate,
};

const fields = [{
  ...commonProps,
  name: 'date',
  reportType: 'date',
  order: 0,
}, {
  ...commonProps,
  name: 'vehicle_name',
  reportType: 'name',
  order: 1,
}, {
  ...commonProps,
  name: 'license_plate',
  reportType: 'license',
  checkedByDefault: false,
  order: 2,
}];

export default fields;
