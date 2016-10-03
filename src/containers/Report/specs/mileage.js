import endpoints from 'configs/endpoints';
import specsUtils from '../utils/specsUtils';

/*
 * Calculate mileage for the whole period.
 * NOT USED FREQUENCY CONCEPTION.
 */
const _calc = (record, { selectedTypes }) =>
  specsUtils.calcToReturn({
    mileage: record.distance !== undefined ? record.distance.toFixed(3, 10) : 0,
  }, selectedTypes);

function _filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['mileage'];

  return specsUtils.filterSimilar(allSelectedReportTypes, similarTypes);
}

const fields = [{
  label: 'Driving Distance (km.)',
  name: 'mileage',
  reportType: 'mileage',
  endpoint: endpoints.mileageReport.url,
  domain: 'mileage',
  checkedByDefault: false,
  order: 3,
  query: {
    tzoffset: new Date().getTimezoneOffset(),
  },
  filterSimilar: _filterSimilar,
  calc: _calc,
}];

export default fields;
