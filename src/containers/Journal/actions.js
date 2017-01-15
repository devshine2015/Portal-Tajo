export const JR_OPEN = 'jrn/open';
export const JR_ADD_ENTRIES = 'jrn/add';

export const jrnOpen = (doOpen) => (dispatch) =>
  dispatch({
    type: JR_OPEN,
    doOpen,
  });

export const jrnAddEntries = (newEntriesList) => (dispatch) =>
  dispatch({
    type: JR_ADD_ENTRIES,
    newEntriesList,
  });
