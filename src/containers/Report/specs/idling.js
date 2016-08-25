function _calc(record, { selectedTypes }) {
  const calcToReturn = (result) =>
    selectedTypes.map((key) => result[key]);

  return calcToReturn({
    stoppedTime: record.stoppedTime,
    idleWhileStopped: record.idleWhileStopped,
  });
}

function filterSimilar(allSelectedReportTypes) {
  const similarTypes = ['stoppedTime', 'idleWhileStopped'];

  return allSelectedReportTypes.filter(type => similarTypes.indexOf(type) !== -1);
}

const commonFields = {
  endpoint: 'report/idling',
  checkedByDefault: false,
  domain: 'idling',
  query: {
    tzoffset: new Date().getTimezoneOffset(),
  },
  filterSimilar,
  calc: _calc,
};

const fields = [{
  ...commonFields,
  reportType: 'stoppedTime',
  label: 'Stop Time',
  name: 'stoppedTime',
  order: 7,
}, {
  ...commonFields,
  reportType: 'idleWhileStopped',
  label: 'Idling Time',
  name: 'idleWhileStopped',
  order: 8,
}];

export default fields;
