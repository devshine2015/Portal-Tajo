export const GF_EDIT = 'gfEditor/editGF';
export const GF_EDIT_UPDATE = 'gfEditor/editUpdateGF';

// export const gfEditCreate = (spawnPos) => (dispatch, getState) =>
//   _createNewGF(spawnPos, dispatch, getState);

export const gfEditUpdate = (newSubj) => (dispatch) =>
  dispatch(_gfEdit(newSubj));

export const gfEditClose = () => (dispatch) =>
  dispatch(_gfEdit(null));


// function _createNewGF(spawnPos, dispatch) {
//   dispatch(_gfEdit(makeLocalGF(spawnPos)));
// }


const _gfEdit = (subjectGF) => ({
  type: GF_EDIT,
  subjectGF,
});
