function filterSimilar(allSelectedReportTypes, similarTypes) {
  return allSelectedReportTypes
    .map((type, index) => ({
      type,
      order: index,
    }))
    .filter(({ type }) => similarTypes.indexOf(type) !== -1);
}

function calcToReturn(resultValues, selectedTypes) {
  return selectedTypes.map(st => ({
    order: st.order,
    value: resultValues[st.type],
  }));
}

export default {
  filterSimilar,
  calcToReturn,
};
