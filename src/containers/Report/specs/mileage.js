import endpoints from 'configs/endpoints';
import specsUtils from '../utils/specsUtils';

/*
 * Calculate mileage for the whole period.
 * NOT USED FREQUENCY CONCEPTION.
 */
const _calc = (record, { selectedTypes }) =>
  specsUtils.calcToReturn({
    mileage: record.distance !== undefined ? record.distance.toFixed(3, 10) : 'N/A',
  }, selectedTypes);

function _filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['mileage'];

  return specsUtils.filterSimilar(allSelectedReportTypes, similarTypes);
}

const fields = [{
  name: 'mileage',
  reportType: 'mileage',
  endpoint: endpoints.mileageReport.url,
  domain: 'mileage',
  checkedByDefault: false,
  order: 3,
  query: {
    // for reports tzoffset is required by backend.
    tzoffset: 0,
  },
  filterSimilar: _filterSimilar,
  calc: _calc,
}];

export default fields;
