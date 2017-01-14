export const JR_OPEN = 'jr/open';
export const JR_ADD_ITEMS = 'jr/add';

export const jrOpen = (doOpen) => (dispatch) =>
  dispatch({
    type: JR_OPEN,
    doOpen,
  });

export const jrAddItems = (newItemsList) => (dispatch) =>
  dispatch({
    type: JR_ADD_ITEMS,
    newItemsList,
  });
