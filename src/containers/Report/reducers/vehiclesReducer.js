import { fromJS } from 'immutable';
import { vehiclesActions } from '../actions';

const initialAvailableVehicles = fromJS([]);

function availableVehiclesReducer(state = initialAvailableVehicles, action) {
  switch (action.type) {
    case vehiclesActions.REPORT_VEHICLES_ADD:
      return state.push(action.id);
    case vehiclesActions.REPORT_VEHICLES_REMOVE: {
      const index = findIndexById(state, action.id);

      if (index !== -1) {
        return state.splice(index, 1);
      }

      return state;
    }
    default: return state;
  }
}

export default availableVehiclesReducer;

export const findIndexById = (state, id) =>
  state.findIndex(item => item === id);
