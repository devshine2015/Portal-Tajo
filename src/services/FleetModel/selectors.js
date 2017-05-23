import { createSelector } from 'reselect';
import { getIsReady } from './reducers/vehiclesReducer';

export const makeGetFleetIsReady = () => {
  return createSelector(getIsReady, (isReady) => {
    return isReady;
  });
};
