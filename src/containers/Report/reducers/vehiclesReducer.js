import { fromJS, List } from 'immutable';
import { vehiclesActions } from '../actions';

const initialState = fromJS({
  selectedVehicles: new List(),
  filteredVehicles: new List(),
  isFiltering: false,
});

function selectedVehiclesReducer(state = initialState, action) {
  switch (action.type) {
    case vehiclesActions.REPORT_VEHICLES_ADD: {
      const sv = state.get('selectedVehicles');
      const nextSv = sv.push(action.id);

      return state.set('selectedVehicles', nextSv);
    }
    case vehiclesActions.REPORT_VEHICLES_REMOVE: {
      const index = findIndexById(state, action.id);

      if (index !== -1) {
        const sv = state.get('selectedVehicles');
        const nextSv = sv.splice(index, 1);

        return state.set('selectedVehicles', nextSv);
      }

      return state;
    }
    case vehiclesActions.REPORT_VEHICLES_FILTER:
      return state.set('filteredVehicles', action.list)
              .set('isFiltering', action.isFiltering);

    default: return state;
  }
}

export default selectedVehiclesReducer;

export const findIndexById = (state, id) =>
  state.get('selectedVehicles').findIndex(item => item === id);
export const getFilteredVehicles = (state) =>
  state.get('filteredVehicles');
export const getSelectedVehicles = (state) =>
  state.get('selectedVehicles');
export const isFiltering = (state) =>
  state.get('isFiltering');

export const getVehicelsForReport = (state) => {
  // if no filtering than just return
  // all selected vehicles
  if (!state.get('isFiltering')) {
    return state.get('selectedVehicles');
  }

  // find selected vehicles
  // among filtered
  const f = state.get('filteredVehicles').filter(fv => {
    const k = state.get('selectedVehicles').findKey(sf =>
      fv.id === sf
    );

    return k !== undefined;
  });

  return f;
};
