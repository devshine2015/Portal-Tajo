function _calc(record, { selectedTypes }) {
  const calcToReturn = (result) =>
    selectedTypes.map((key) => result[key]);

  return calcToReturn({
    // record.dist.total in meters
    odometer: record.dist && parseInt((record.dist.total / 1000), 10) || 'N/A',
  });
}

function filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['odometer'];

  return allSelectedReportTypes.filter(type => similarTypes.indexOf(type) !== -1);
}

const commonFields = {
  endpoint: 'status',
  checkedByDefault: false,
  domain: 'stats',
  query: {
    tzoffset: new Date().getTimezoneOffset(),
  },
  filterSimilar,
  calc: _calc,
};

const fields = [{
  ...commonFields,
  reportType: 'odometer',
  label: 'ODO',
  name: 'odometer',
  order: 7,
}];

export default fields;
