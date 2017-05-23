import { createSelector } from 'reselect';
import { getIsLoading } from './reducers/vehiclesReducer';

export const makeGetFleetIsReady = () => {
  return createSelector(getIsLoading, (isLoading) => {
    return !isLoading;
  });
};
