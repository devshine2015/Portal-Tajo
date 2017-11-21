import { fromJS } from 'immutable';
import {
  UPDATE_FLEET_OWERVIEW,
  UPDATE_FLEET_FUEL,
} from './actions';

const initialState = fromJS({
  totalDist: 0,
  avgSpeed: 0,
  totalRunTime: 0,
  totalDriveTime: 0,
  totalIdleTime: 0,
  toatalFuel: 0,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FLEET_OWERVIEW:
      return state.withMutations((s) => {
        s.set('totalDist', action.totalDist)
          .set('avgSpeed', action.avgSpeed)
          .set('totalRunTime', action.totalRunTime)
          .set('totalDriveTime', action.totalDriveTime)
          .set('totalIdleTime', action.totalIdleTime);
      });
    case UPDATE_FLEET_FUEL:
      return state.withMutations((s) => {
        s.set('toatalFuel', action.toatalFuel);
      });

    default:
      return state;
  }
}

export default reducer;

const _fleetOverviewSlice = state =>
  state.get('fleetOverview');

export const getFleetOverView = state =>
  _fleetOverviewSlice(state).toJS();
