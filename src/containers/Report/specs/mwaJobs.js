import moment from 'moment';
import endpoints from 'configs/endpoints';
import specsUtils from '../utils/specsUtils';

function withinPeriod(time, period) {
  return moment(time).isBetween(period.start, period.end);
}

/**
 *
 *
 *
 *
 **/
function calcJobs(records, { selectedTypes, period, frequency }) {
  return {
    order: 2,
    value: 'asdf',
  };  // return specsUtils.calcToReturn({
  //   mwaJobs: 'coming up..',
  // }, selectedTypes);
}

function _filterSimilar(allSelectedReportTypes) {
}

const commonProps = {
  endpoint: 'mwa',
  customReportKind: 'mwa',
  query: {
    downsampleSec: 30,
    // for reports tzoffset is required by backend.
    tzoffset: 0,
  },
  domain: 'Jobs',
  checkedByDefault: false,
  filterSimilar: _filterSimilar,
  calc: calcJobs,
};

const fields = [{
  ...commonProps,
  label: 'Nr of jobs',
  name: 'mwaJobsN',
  reportType: 'mwaJobsN',
  order: 4,
}];

export default fields;
