import { fromJS } from 'immutable';
import {
  UPDATE_FLEET_OWERVIEW,
  UPDATE_FLEET_FUEL,
} from './actions';

const initialState = fromJS({
  avgSpeed: 0,
  idleOver: 0,
  idleUnder: 0,
  normalDriving: 0,
  totalDistance: 0,
  totalDrivingTime: 0,
  totalIdleTime: 0,
  totalRunningTime: 0,
  vehicleCount: 0,
  totalFuel: 0,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FLEET_OWERVIEW:
      return state.withMutations((s) => {
        s.set('avgSpeed', action.avgSpeed)
          .set('idleOver', action.idleOver)
          .set('idleUnder', action.idleUnder)
          .set('normalDriving', action.normalDriving)
          .set('totalDistance', action.totalDistance)
          .set('totalDrivingTime', action.totalDrivingTime)
          .set('totalIdleTime', action.totalIdleTime)
          .set('totalRunningTime', action.totalRunningTime)
          .set('vehicleCount', action.vehicleCount);
      });
    case UPDATE_FLEET_FUEL:
      return state.withMutations((s) => {
        s.set('totalFuel', action.totalFuel);
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
