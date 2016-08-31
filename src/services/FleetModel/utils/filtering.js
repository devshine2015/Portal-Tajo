// export const filterByName = (state, filterString) => {
//   const checkName = filterString.toLowerCase();
//   let newState = state;
//   state.get('processedList').forEach((v) => {
//     const theName = v.get('name').toLowerCase();
//     if (theName.search(checkName) === -1) {
//       newState = newState.setIn(['processedList', v.get('id'), 'filteredOut'], true);
//     } else {
//       newState = newState.setIn(['processedList', v.get('id'), 'filteredOut'], false);
//     }
//     return true;
//   });
//   return newState;
// };

export const filterProcessedListByName = (origin = {}, searchString) => {
  const result = Object.assign({}, origin);
  for (const k in origin) {
    if (origin.hasOwnProperty(k)) {
      result[k] = Object.assign({}, origin[k]);
      result[k].filteredOut = origin[k].name.toLowerCase().search(searchString) === -1;
    }
  }
  return result;
};
