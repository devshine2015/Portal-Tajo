import { createSelector } from 'reselect';
import { getIsReady } from './reducers/vehiclesReducer';

export default function makeGetFleetIsReady() {
  return createSelector(getIsReady, isReady => isReady);
}
