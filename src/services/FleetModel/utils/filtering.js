

export const filterByName = (state, filterString) => {
  const checkName = filterString.toLowerCase();
  let newState = state;
  state.get('processedList').forEach((v) => {
    const theName = v.get('name').toLowerCase();
    if (theName.search(checkName) === -1) {
      newState = newState.setIn(['processedList', v.get('id'), 'filteredOut'], true);
    } else {
      newState = newState.setIn(['processedList', v.get('id'), 'filteredOut'], false);
    }
    return true;
  });
  return newState;
};
